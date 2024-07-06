import {Component, inject, OnInit, Signal} from '@angular/core';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ShoppingCart, ShoppingCartItem} from "../../shared/interfaces/ShoppingCart";
import {GiftCardDto} from "../../shared/interfaces/GiftCard";
import {NotebookDto} from "../../shared/interfaces/Notebook";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {BaseComponent} from "../../base.component";
import {FormHelperService} from "../../modules/admin/shared/services/form-helper.service";
import {DeliveryOptionDto} from "../../shared/interfaces/DeliveryOptionDto";
import {InscriptionDto} from "../../shared/interfaces/Inscription";
import {WorkshopDisponibilities} from "../../modules/admin/shared/interfaces/Workshop";
import {EMPTY, of, switchMap} from "rxjs";

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  formHelper = inject(FormHelperService);
  shoppingCart = inject(ShoppingCartService);
  cart: Signal<ShoppingCart> = this.shoppingCart.$userShoppingCart;
  deliveryOptions = this.dataSignal.$deliveryOptionAvailable;
  deliveryOptionSelected: Signal<DeliveryOptionDto | null> = this.shoppingCart.$userDeliveryOption;
  giftCardActive: Signal<GiftCardDto | null> = this.shoppingCart.$userGiftCardActive;
  disponibilities: Signal<WorkshopDisponibilities[]> = this.dataSignal.$workshopsRegistrationsReserved;

  isDeliveryDropdownOpen: boolean = false;
  itemSlug: string = "";
  quantityIncreased: boolean = false;
  quantityDecreased: boolean = false;
  isFormSubmit: boolean = false;
  inputValueGiftCard: string = "";

  backgroundImageParentCreations = '../../../assets/images/figma/booktique.jpg';

  ngOnInit(): void {
    this.dataSignal.getDeliveryOptionsAvailable();
    for (const INSCRIPTION of this.shoppingCart.$userShoppingCart().inscriptions) {
      this.dataSignal.getCounterWorkshopRegistrationsReserved(INSCRIPTION.item.workshopDto.slug)
    }
  }

  protected override ngOnDestroy() {
    super.ngOnDestroy();
    this.shoppingCart.setGiftCardActive(null);
  }

  toggleDropdown(value: boolean): void {
    this.isDeliveryDropdownOpen = value;
  }

  increase(item: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {
    this.itemSlug = item.slug;
    this.quantityIncreased = true;
    this.quantityDecreased = false;
    if (type === 'notebooks' || (type === 'inscriptions' && this.getAvailableRegistrations(item as InscriptionDto) > 0)) {
      if (type === 'inscriptions') {
        this.changeQuantity('add-participant', item, type);
      } else {
        this.shoppingCart.addItem(item, type);
      }
    }
    setTimeout(() => {
      this.quantityIncreased = false;
    }, 200);
  }

  getAvailableRegistrations(inscription: InscriptionDto ): number {
    const REGISTRATIONS_RESERVED = this.disponibilities().find(dispo => dispo.workshopSlug === inscription.workshopDto.slug);
    const FREE_REGISTRATIONS = inscription.workshopDto.registrations - (REGISTRATIONS_RESERVED ? REGISTRATIONS_RESERVED.registrationsReserved : 0);
    return FREE_REGISTRATIONS;
  }

  decrease(item: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {
    this.itemSlug = item.slug;
    this.quantityIncreased = false;
    this.quantityDecreased = true;
    if (type === 'inscriptions') {
      this.changeQuantity('remove-participant', item, type);
    } else {
      this.shoppingCart.subtractItem(item, type);
    }
    setTimeout(() => {
      this.quantityDecreased = false;
    }, 200);
  }

  changeQuantity(addOrRemove: 'add-participant' | 'remove-participant', item: NotebookDto | InscriptionDto, type: 'notebooks' | 'inscriptions'): void {

    this.dataSignal.changeQuantityInscription(addOrRemove, item as InscriptionDto).subscribe({
      next: (success) => {
        if (success) {
          if (addOrRemove === 'add-participant') {
            this.shoppingCart.addItem(item, type);
          } else if (addOrRemove === 'remove-participant') {
            this.shoppingCart.subtractItem(item, type);
          }
          return this.dataSignal.getCounterWorkshopRegistrationsReserved((item as InscriptionDto).workshopDto.slug);
        }
      },
      error: (err) => console.error('Error:', err)
    });
  }

  getDeliveryOptionValueForm(): string {
    if (this.deliveryOptionSelected()) {
      return `${this.deliveryOptionSelected()!.name} (${this.deliveryOptionSelected()!.carrier})`;
    }
    return "";
  }

  onKeyUpGiftCard(event: KeyboardEvent): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    this.inputValueGiftCard = INPUT_ELEMENT.value;
  }

  checkGiftCard(): void {
    if (this.inputValueGiftCard && this.inputValueGiftCard !== this.giftCardActive()?.code) {
      this.dataSignal.checkGiftCard(this.inputValueGiftCard);
    }
    this.inputValueGiftCard = "";
  }

  deleteInscription(inscription: ShoppingCartItem<InscriptionDto>): void {
    this.shoppingCart.deleteItemToShoppingCart(inscription.item, 'inscriptions');
    this.dataSignal.deleteInscriptionBySlug(inscription.item.slug);
  }

  submitCheckoutForm(): void {
    this.isFormSubmit = true;
    if (this.deliveryOptionSelected()) {
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    // this.shoppingCart.cleanLocalStorage();
  }
}
