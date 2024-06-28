import {Injectable, Signal, signal} from '@angular/core';
import {ShoppingCart, ShoppingCartItem} from '../interfaces/ShoppingCart';
import { NotebookDto } from '../interfaces/Notebook';
import {ShoppingCartSignalState} from "../interfaces/ShoppingCartSignalState";
import {InscriptionDto} from "../../modules/admin/shared/interfaces/Inscription";

type ShoppingCartItemUnion =
  | { item: NotebookDto; quantity: number }
  | { item: InscriptionDto; quantity: number };

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly state: ShoppingCartSignalState = {
    $privateUserShoppingCart: signal<ShoppingCart>({ notebooks: [], inscriptions: []}),
  }

  public readonly $userShoppingCart: Signal<ShoppingCart> = this.state.$privateUserShoppingCart.asReadonly();

  getValueLocalStorage(): ShoppingCart {
    const VALUE_IN_LOCAL_STORAGE = localStorage.getItem('userCartVitalitte') ?
      JSON.parse(localStorage.getItem('userCartVitalitte')!) :
      {
        notebooks: [],
        inscriptions: [],
      }
      return VALUE_IN_LOCAL_STORAGE;
  }

  setShoppingCart(): void {
    this.state.$privateUserShoppingCart.set(this.getValueLocalStorage());
  }

  includesInShoppingCart(itemToVerify: InscriptionDto | NotebookDto, type: 'notebooks' | 'inscriptions'): boolean {
    return this.$userShoppingCart()[type].some(item => item.item.slug === itemToVerify.slug);
  }

  counterTotalShoppingCart(): number {
    const allItems: ShoppingCartItemUnion[] = [...this.$userShoppingCart().notebooks, ...this.$userShoppingCart().inscriptions];
    return allItems.reduce((total, item) => total + item.quantity, 0);
  }

  totalPrice(): number {

    let total : number = 0;

    for (const NOTEBOOK of this.$userShoppingCart().notebooks) {
      total += (NOTEBOOK.item.price * NOTEBOOK.quantity)
    }
    for (const WORKSHOP of this.$userShoppingCart().inscriptions) {
      total += (WORKSHOP.item.workshopDto.price * WORKSHOP.quantity)
    }

    return parseFloat(total.toFixed(2));
  }

  itemsForPaypal(): any {

    this.setShoppingCart()
    let itemsPaypal: any = []

    for (const NOTEBOOK of this.$userShoppingCart().notebooks) {
      itemsPaypal.push({
        name: ("Carnet : " + NOTEBOOK.item.name),
        quantity: NOTEBOOK.quantity.toString(),
        unit_amount: {
            currency_code: 'EUR',
            value: NOTEBOOK.item.price.toString(),
          },
      })
    }
    for (const WORKSHOP of this.$userShoppingCart().inscriptions) {
      itemsPaypal.push({
        name: ("Atelier : " + WORKSHOP.item.workshopDto.title + " du " + + WORKSHOP.item.workshopDto.date),
        quantity: WORKSHOP.quantity.toString(),
        unit_amount: {
          currency_code: 'EUR',
          value: WORKSHOP.item.workshopDto.price.toString(),
        },
      })
    }
    return itemsPaypal;
  }

  editCartInLocalStorage(shoppingCart : ShoppingCart): void {
    localStorage.setItem('userCartVitalitte', JSON.stringify(shoppingCart));
    this.setShoppingCart();
  }

  counterQuantity(item: InscriptionDto | NotebookDto, type: 'notebooks' | 'inscriptions'): number {
    const PRODUCT = this.$userShoppingCart()[type].find(ITEM => ITEM.item.slug === item.slug);
    return PRODUCT ? PRODUCT.quantity : 0;
  }

  addItem(itemToAdd: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {

    let cart = this.getValueLocalStorage();

    for (const ITEM of cart[type]) {
      if (ITEM.item.slug === itemToAdd.slug) {
        ITEM.quantity++
      }
    }

    if (!this.includesInShoppingCart(itemToAdd, type)) {
      const NEW_ITEM = { item : itemToAdd, quantity : 1 }
      cart[type].push(NEW_ITEM as ShoppingCartItem<NotebookDto> & ShoppingCartItem<InscriptionDto>)
    }

    this.editCartInLocalStorage(cart);
  }

  subtractItem(itemToSubtract: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {

    let cart = this.getValueLocalStorage();

    if (this.includesInShoppingCart(itemToSubtract, type)) {
      for (const ITEM of cart[type]) {
        if (ITEM.item.slug === itemToSubtract.slug) {
          if (ITEM.quantity > 1) {
            ITEM.quantity--
            this.editCartInLocalStorage(cart);
          } else {
            this.deleteItemToShoppingCart(itemToSubtract, type);
          }
        }
      }
    }
  }

  deleteItemToShoppingCart(itemToDelete: InscriptionDto | NotebookDto, type: 'notebooks' | 'inscriptions'): void {

    let cart = this.getValueLocalStorage();

    if (type === 'notebooks') {
      cart.notebooks = cart.notebooks.filter(item => item.item.slug !== itemToDelete.slug) as ShoppingCartItem<NotebookDto>[];
    } else if (type === 'inscriptions') {
      cart.inscriptions = cart.inscriptions.filter(item => item.item.slug !== itemToDelete.slug) as ShoppingCartItem<InscriptionDto>[];
    }
    this.editCartInLocalStorage(cart);
  }

  cleanLocalStorage(): void{
    localStorage.removeItem('userCartVitalitte');
  }
}
