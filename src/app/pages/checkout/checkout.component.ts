import {Component, inject, OnInit, Signal} from '@angular/core';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ShoppingCart, ShoppingCartItem} from "../../shared/interfaces/ShoppingCart";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {BaseComponent} from "../../base.component";
import {InscriptionDto} from "../../shared/interfaces/Inscription";

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  shoppingCartService = inject(ShoppingCartService);
  shoppingCart$: Signal<ShoppingCart> = this.shoppingCartService.$userShoppingCart;

  backgroundImageParentCreations = '../../../assets/images/figma/booktique.jpg';

  ngOnInit(): void {
    this.dataSignal.getDeliveryOptionsAvailable();
    this.dataSignal.verifyShoppingCartValidity();
    this.getCountersWorkshopsRegistrationsReserved();
  }

  protected override ngOnDestroy() {
    super.ngOnDestroy();
    this.shoppingCartService.setGiftCardActive(null);
  }

  private getCountersWorkshopsRegistrationsReserved(): void {
    for (const INSCRIPTION of this.shoppingCartService.$userShoppingCart().inscriptions) {
      this.dataSignal.getCounterWorkshopRegistrationsReserved(INSCRIPTION.item.workshopDto.slug)
    }
  }

  deleteInscription(inscription: ShoppingCartItem<InscriptionDto>): void {
    this.shoppingCartService.deleteItemToShoppingCart(inscription.item, 'inscriptions');
    this.dataSignal.deleteInscriptionBySlug(inscription.item.slug);
  }
}
