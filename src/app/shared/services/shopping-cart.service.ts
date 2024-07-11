import {inject, Injectable, Signal, signal} from '@angular/core';
import {ShoppingCart, ShoppingCartItem} from '../interfaces/ShoppingCart';
import { NotebookDto } from '../interfaces/Notebook';
import {ShoppingCartSignalState} from "../interfaces/ShoppingCartSignalState";
import {BaseComponent} from "../../base.component";
import {ApiRequestsService} from "./api-requests.service";
import {AnguilleSignalService} from "./anguille-signal.service";
import {GiftCardDto} from "../interfaces/GiftCard";
import {DeliveryOptionDto} from "../interfaces/DeliveryOptionDto";
import {InscriptionDto} from "../interfaces/Inscription";
import {VITALITTE_PROJECT} from "../variables/AppConfig";
import {BehaviorSubject, Observable} from "rxjs";
import {ModalSignalService} from "./modal-signal.service";

type ShoppingCartItemUnion =
  | { item: NotebookDto; quantity: number }
  | { item: InscriptionDto; quantity: number };

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends BaseComponent {

  private apiRequests = inject(ApiRequestsService);
  private anguilleSignal = inject(AnguilleSignalService);
  private modalSignal = inject(ModalSignalService);

  private readonly state: ShoppingCartSignalState = {
    $privateUserShoppingCart: signal<ShoppingCart>({ notebooks: [], inscriptions: []}),
    $privateDeliveryOption: signal<DeliveryOptionDto | null>(null),
    $privateGiftCardActive: signal<GiftCardDto | null>(null),
    $privateShoppingCartSignalChanges: new BehaviorSubject<number>(0),
  }

  public readonly $userShoppingCart: Signal<ShoppingCart> = this.state.$privateUserShoppingCart.asReadonly();
  public readonly $userDeliveryOption: Signal<DeliveryOptionDto | null> = this.state.$privateDeliveryOption.asReadonly();
  public readonly $userGiftCardActive: Signal<GiftCardDto | null> = this.state.$privateGiftCardActive.asReadonly();
  public readonly $shoppingCartSignalChanges: Observable<number> = this.state.$privateShoppingCartSignalChanges.asObservable();

  private getValueLocalStorage(): ShoppingCart {
    return localStorage.getItem('userCartVitalitte') ?
      JSON.parse(localStorage.getItem('userCartVitalitte')!) :
      {
        notebooks: [],
        inscriptions: [],
      };
  }

  setShoppingCartChanges(): void {
    this.state.$privateShoppingCartSignalChanges.next(1);
  }

  setShoppingCart(): void {
    this.state.$privateUserShoppingCart.set(this.getValueLocalStorage());
  }

  setDeliveryOption(value: DeliveryOptionDto | null): void {
    this.state.$privateDeliveryOption.set(value);
    this.setShoppingCartChanges();
  }

  setGiftCardActive(value: GiftCardDto | null): void {
    this.state.$privateGiftCardActive.set(value);
    this.setShoppingCartChanges();
  }

  includesInShoppingCart(itemToVerify: InscriptionDto | NotebookDto, type: 'notebooks' | 'inscriptions'): boolean {
    return this.$userShoppingCart()[type].some(item => item.item.slug === itemToVerify.slug);
  }

  counterTotalShoppingCart(): number {
    const allItems: ShoppingCartItemUnion[] = [...this.$userShoppingCart().notebooks, ...this.$userShoppingCart().inscriptions];
    return allItems.reduce((total, item) => total + item.quantity, 0);
  }

  itemsForPaypal(): any {

    this.setShoppingCart();
    let itemsPaypal: any = [];

    for (const NOTEBOOK of this.$userShoppingCart().notebooks) {
      itemsPaypal.push({
        name: ("Carnet : " + NOTEBOOK.item.name),
        quantity: NOTEBOOK.quantity.toString(),
        unit_amount: {
            currency_code: 'EUR',
            value: this.applyDiscount(NOTEBOOK.item.price).toString(),
          },
      })
    }
    for (const INSCRIPTION of this.$userShoppingCart().inscriptions) {

      itemsPaypal.push({
        name: ("Atelier : " + INSCRIPTION.item.workshopDto.title + " du " + INSCRIPTION.item.workshopDto.date),
        quantity: INSCRIPTION.quantity.toString(),
        unit_amount: {
          currency_code: 'EUR',
          value: this.applyDiscount(INSCRIPTION.item.workshopDto.price).toString(),
        },
      })
    }
    return itemsPaypal;
  }

  editCartInLocalStorage(shoppingCart: ShoppingCart): void {
    console.log("shoppingCart")
    console.log(shoppingCart)
    localStorage.setItem('userCartVitalitte', JSON.stringify(shoppingCart));
    this.setShoppingCart();
  }

  counterQuantity(item: InscriptionDto | NotebookDto, type: 'notebooks' | 'inscriptions'): number {
    const PRODUCT = this.$userShoppingCart()[type].find(ITEM => ITEM.item.slug === item.slug);
    return PRODUCT ? PRODUCT.quantity : 0;
  }

  counterQuantityByType(type: 'notebooks' | 'inscriptions'): number {

    let totalQuantity = 0;

    if (this.$userShoppingCart()[type].length > 0) {
      this.$userShoppingCart()[type].forEach(item => {
        totalQuantity += item.quantity;
      });
    }

    return totalQuantity;
  }

  priceByTypeWithDiscount(type: 'notebooks' | 'inscriptions', applyDiscount: boolean): number {

    let totalPriceByType = 0;

    if (this.$userShoppingCart()[type].length > 0) {
      if (type === 'notebooks') {
        this.$userShoppingCart()[type].forEach(item => {
          const itemPrice = applyDiscount ? this.applyDiscount(item.item.price) : item.item.price;
          totalPriceByType += item.quantity * itemPrice;
        });
      } else if (type === 'inscriptions') {
        this.$userShoppingCart()[type].forEach(item => {
          const itemPrice = applyDiscount ? this.applyDiscount(item.item.workshopDto.price) : item.item.workshopDto.price;
          totalPriceByType += item.item.quantity * itemPrice;
        });
      }
    }
    return totalPriceByType;
  }

  convertPriceToFormatExpected(value: number): number {
    const truncateToCent =  (Math.trunc(value * 100)) / 100;
    return parseFloat(truncateToCent.toFixed(2))
  }

  getDeliveryPrice(): number {
    return this.$userDeliveryOption() ? this.$userDeliveryOption()!.price : 0;
  }

  isDeliveryFree(): boolean {
    const TOTAL_PRICE = this.getTotalPriceWithGiftCardAndDelivery(true,false);
    return TOTAL_PRICE > VITALITTE_PROJECT.front.shipping.free;
  }

  applyDiscount(originalPrice: number): number {
    if (this.$userGiftCardActive()) {
      if (this.$userGiftCardActive()!.percentage) {
        const DISCOUNT = this.convertPriceToFormatExpected(originalPrice * (this.$userGiftCardActive()!.rising / 100));
        return originalPrice - DISCOUNT;
      }
    }
    return this.convertPriceToFormatExpected(originalPrice);
  }

  getTotalPriceWithGiftCardAndDelivery(applyGiftCard: boolean, applyDeliveryPrice: boolean): number {
    let totalPrice = 0;

    for (const NOTEBOOK of this.$userShoppingCart().notebooks) {
      let itemPrice = NOTEBOOK.item.price
      if (this.$userGiftCardActive() && applyGiftCard) {
        itemPrice = this.applyDiscount(NOTEBOOK.item.price);
      }
      totalPrice += itemPrice * NOTEBOOK.quantity;
    }

    for (const INSCRIPTION of this.$userShoppingCart().inscriptions) {
      let itemPrice = INSCRIPTION.item.workshopDto.price
      if (this.$userGiftCardActive() && applyGiftCard) {
        itemPrice = this.applyDiscount(INSCRIPTION.item.workshopDto.price);
      }
      totalPrice += itemPrice * INSCRIPTION.item.quantity;
    }

    // if (applyGiftCard && this.$userGiftCardActive() && !this.$userGiftCardActive()?.percentage) {
    //   totalPrice -= this.$userGiftCardActive()!.rising;
    // }

    if (applyDeliveryPrice && this.$userDeliveryOption()) {
      totalPrice += this.getDeliveryPrice();
    }

    return this.convertPriceToFormatExpected(totalPrice);
  }

  addItem(itemToAdd: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {

    let cart = this.getValueLocalStorage();

    for (const ITEM of cart[type]) {
      if (ITEM.item.slug === itemToAdd.slug) {
        if (type === 'inscriptions') {
          (ITEM as ShoppingCartItem<InscriptionDto>).item.quantity++;
        }
        ITEM.quantity++
      }
    }

    if (!this.includesInShoppingCart(itemToAdd, type)) {
      const QUANTITY_ADAPTED = type === 'inscriptions' ? (itemToAdd as InscriptionDto).quantity : 1;
      const NEW_ITEM = { item : itemToAdd, quantity : QUANTITY_ADAPTED }
      cart[type].push(NEW_ITEM as ShoppingCartItem<NotebookDto> & ShoppingCartItem<InscriptionDto>)
    }

    this.editCartInLocalStorage(cart);
    this.setShoppingCartChanges();
  }

  subtractItem(itemToSubtract: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {

    let cart = this.getValueLocalStorage();

    if (this.includesInShoppingCart(itemToSubtract, type)) {
      for (const ITEM of cart[type]) {
        if (ITEM.item.slug === itemToSubtract.slug) {
          if (ITEM.quantity > 1) {
            if (type === 'inscriptions') {
              (ITEM as ShoppingCartItem<InscriptionDto>).item.quantity--;
            }
            ITEM.quantity--
            this.editCartInLocalStorage(cart);
          } else {
            this.deleteItemToShoppingCart(itemToSubtract, type);
          }
        }
      }
    }
    this.setShoppingCartChanges();
  }

  deleteItemToShoppingCart(itemToDelete: InscriptionDto | NotebookDto, type: 'notebooks' | 'inscriptions'): void {

    let cart = this.getValueLocalStorage();

    if (type === 'notebooks') {
      cart.notebooks = cart.notebooks.filter(item => item.item.slug !== itemToDelete.slug) as ShoppingCartItem<NotebookDto>[];
    } else if (type === 'inscriptions') {
      cart.inscriptions = cart.inscriptions.filter(item => item.item.slug !== itemToDelete.slug) as ShoppingCartItem<InscriptionDto>[];
    }
    this.editCartInLocalStorage(cart);
    this.setShoppingCartChanges();
  }

  paymentSuccess(): void {
    const USER_MESSAGE_SUCCESS = "Commande réalisée avec succès !"
    this.confirmNewInscription();
    this.cleanLocalStorage();
    this.modalSignal.showModal(USER_MESSAGE_SUCCESS, false).subscribe({
      next: () => true,
      error: (err) => this.anguilleSignal.changeMessage(err.error.message)
    });
  }

  confirmNewInscription(): void {
    const INSCRIPTIONS = this.$userShoppingCart().inscriptions;
    if (INSCRIPTIONS.length > 0) {
      for (const INSCRIPTION of INSCRIPTIONS) {
        this.subscriptions.push(
          this.apiRequests.confirmInscriptionBySlug(INSCRIPTION.item.slug).subscribe({
            next: (res) => res,
            error: (err) => this.anguilleSignal.changeMessage(err.error.message)
          })
        )
      }
    }
  }

  cleanLocalStorage(): void{
    localStorage.removeItem('userCartVitalitte');
    this.setShoppingCart();
  }
}
