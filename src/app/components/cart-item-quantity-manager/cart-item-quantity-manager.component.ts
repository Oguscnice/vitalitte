import {Component, inject, Input, OnInit, Signal} from '@angular/core';
import {ProductDto} from "../../shared/interfaces/Product";
import {InscriptionDto} from "../../shared/interfaces/Inscription";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {WorkshopDisponibilities} from "../../modules/admin/shared/interfaces/Workshop";
import {BaseComponent} from "../../base.component";
import {NgClass} from "@angular/common";
import {KeyShoppingCart, ShoppingCartItem} from "../../shared/interfaces/ShoppingCart";

@Component({
  selector: 'app-cart-item-quantity-manager',
  standalone: true,
  imports: [ NgClass],
  templateUrl: './cart-item-quantity-manager.component.html',
  styles: [`
    @import "../../scss/variables.scss";

    .cart-manager {
      max-width: 240px;
      p {
        display: inline-block;
      }
      .manage-icon {
        color: $lilac;
        background-color: $white;
        font-size: $fourth-font-size;
        border-radius: 100%;
        box-shadow: 0 4px 8px $orange-dark;
      }
      div {
        p {
          font-weight: bold;
        }
        .fa-cart-shopping {
          transition: transform 0.2s;
          font-size: $fourth-font-size;
          @include text-shadow(2px, $lilac-light-opacity-low)
        }
      }
    }

    .cart-manager.pulse-add .fa-cart-shopping {
      animation: enterCart 0.2s ease-in-out;
    }

    .cart-manager.pulse-remove .fa-cart-shopping {
      animation: exitCart 0.2s ease-in-out;
    }

    // Breackpoint list
    // Mobiles vers Tablettes :
    @media screen and (min-width: 768px) {
      .cart-manager {
        .manage-icon {
          font-size: $double-font-size;
        }
        div {
          .fa-cart-shopping {
            font-size: $triple-font-size;
          }
        }
      }
    }

    // Breackpoint list
    // Tablettes vers Ordinateurs :
    @media screen and (min-width: 992px) {
      .cart-manager {
        width: 80%;
        .manage-icon {
          font-size: $double-font-size;
        }
        div {
          .fa-cart-shopping {
            font-size: $double-font-size;
          }
        }
      }
    }
  `]
})
export class CartItemQuantityManagerComponent extends BaseComponent implements OnInit {

  @Input() product!: ShoppingCartItem<InscriptionDto> | ShoppingCartItem<ProductDto>;
  type!: KeyShoppingCart;
  dataSignal = inject(DataSignalService);
  shoppingCart = inject(ShoppingCartService);

  disponibilities: Signal<WorkshopDisponibilities[]> = this.dataSignal.$workshopsRegistrationsReserved;
  quantityItemTargetSlug: string = "";
  quantityIncreased: boolean = false;
  quantityDecreased: boolean = false;

  ngOnInit(): void {
    this.affectType();
  }

  affectType(): void {
    if (this.isInscription()) {
      this.type = 'inscriptions';
    } else {
      this.type = 'products';
    }
  }

  isInscription(): boolean {
    return (this.product.item as InscriptionDto).workshopDto !== undefined;
  }

  increase(): void {
    this.quantityItemTargetSlug = this.product.item.slug!;
    this.quantityIncreased = true;
    this.quantityDecreased = false;
    if (this.isInscription() && this.getAvailableRegistrations() > 0) {
      this.changeQuantity('add-participant');
    } else if (this.type === 'products') {
      this.shoppingCart.addItem(this.product.item, this.type);
    }
    setTimeout(() => {
      this.quantityIncreased = false;
    }, 200);
  }

  decrease(): void {
    this.quantityItemTargetSlug = this.product.item.slug!;
    this.quantityIncreased = false;
    this.quantityDecreased = true;
    if (this.isInscription()) {
      this.changeQuantity('remove-participant');
    } else {
      this.shoppingCart.subtractItem(this.product.item, this.type);
    }
    setTimeout(() => {
      this.quantityDecreased = false;
    }, 200);
  }

  private changeQuantity(addOrRemove: 'add-participant' | 'remove-participant'): void {
  this.subscriptions.push(
    this.dataSignal.changeQuantityInscription(addOrRemove, this.product.item as InscriptionDto).subscribe({
        next: (success) => {
          if (success) {
            if (addOrRemove === 'add-participant') {
              this.shoppingCart.addItem(this.product.item, this.type);
            } else if (addOrRemove === 'remove-participant') {
              this.shoppingCart.subtractItem(this.product.item, this.type);
            }
            return this.dataSignal.getCounterWorkshopRegistrationsReserved((this.product.item as InscriptionDto).workshopDto.slug);
          }
        },
        error: (err) => console.error('Error:', err)
      })
    )
  }

  getAvailableRegistrations(): number {
    const REGISTRATIONS_RESERVED = this.disponibilities().find(dispo => dispo.workshopSlug === (this.product.item as InscriptionDto).workshopDto.slug);
    const FREE_REGISTRATIONS = (this.product.item as InscriptionDto).workshopDto.registrations - (REGISTRATIONS_RESERVED ? REGISTRATIONS_RESERVED.registrationsReserved : 0);
    return FREE_REGISTRATIONS;
  }

  protected readonly ShoppingCartService = ShoppingCartService;
}
