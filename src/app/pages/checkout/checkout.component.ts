import {Component, inject, OnInit, Signal} from '@angular/core';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ShoppingCart, ShoppingCartItem} from "../../shared/interfaces/ShoppingCart";
import {NotebookDto} from "../../shared/interfaces/Notebook";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {BaseComponent} from "../../base.component";
import {InscriptionDto} from "../../shared/interfaces/Inscription";
import {WorkshopDisponibilities} from "../../modules/admin/shared/interfaces/Workshop";

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  shoppingCart = inject(ShoppingCartService);
  shoppingCart$: Signal<ShoppingCart> = this.shoppingCart.$userShoppingCart;

  backgroundImageParentCreations = '../../../assets/images/figma/booktique.jpg';

  ngOnInit(): void {
    this.dataSignal.getDeliveryOptionsAvailable();
    this.dataSignal.verifyShoppingCartValidity();
    this.getCountersWorkshopsRegistrationsReserved();
  }

  protected override ngOnDestroy() {
    super.ngOnDestroy();
    this.shoppingCart.setGiftCardActive(null);
  }

  private getCountersWorkshopsRegistrationsReserved(): void {
    for (const INSCRIPTION of this.shoppingCart.$userShoppingCart().inscriptions) {
      this.dataSignal.getCounterWorkshopRegistrationsReserved(INSCRIPTION.item.workshopDto.slug)
    }
  }

  deleteInscription(inscription: ShoppingCartItem<InscriptionDto>): void {
    this.shoppingCart.deleteItemToShoppingCart(inscription.item, 'inscriptions');
    this.dataSignal.deleteInscriptionBySlug(inscription.item.slug);
  }
}
