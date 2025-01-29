import {Component, inject, OnDestroy} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {CustomCurrencyPipe} from "../../shared/services/pipes/custom-currency.pipe";

@Component({
  selector: 'app-modal-shopping-cart-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    CustomCurrencyPipe
  ],
  templateUrl: './modal-shopping-cart-list.component.html',
  styles: [`
    @import "../../scss/variables.scss";
    @import "../../scss/buttons.scss";

    .shopping-cart-list-modal {
      position: fixed;
      height: calc(100vh - var(--height-header));
      width: 100vw;
      top: var(--height-header);
      left: 0;
      backdrop-filter: blur(5px);

      .shopping-cart-list {
        @include outline-picture;
        height: 80%;
        width: 80%;
        background-color: $white;
        padding: $triple-padding;

        h4, h5, h6 {
          font-weight: bolder;
          width: 100%;
          text-align: right;
        }
        h4 {
          text-align: left;
        }
        h4, h5 {
          font-size: $triple-font-size;
        }
        h6 {
          font-weight: bold;
          font-size: $double-font-size;
        }

        .shopping-cart-type-list {
          width: 100%;
          .shopping-cart-type-title-quantity-price {
            .shopping-cart-item-title,
            .shopping-cart-item-quantity,
            .shopping-cart-item-price,
            .shopping-cart-item-per-quantity-price {
              padding: $normal-padding 0 $normal-padding $normal-padding;
              white-space: nowrap;
            }
            .shopping-cart-item-title {
              padding-left: 0;
            }
            .shopping-cart-item-title {
              width: 100%;
              text-align: left;
              overflow-x: hidden;
              p {
                width: 100%;
                text-align: left;
              }
            }
          }
        }
      }
    }

    // Breackpoint list
    // Mobiles vers Tablettes :
    @media screen and (min-width: 768px) {
      .shopping-cart-list-modal {
        .shopping-cart-list {
          max-width: $max-width-768px;
        }
      }
    }
  `]
})
export class ModalShoppingCartListComponent implements OnDestroy {

  shoppingCartService = inject(ShoppingCartService);
  shoppingCartValue$ = this.shoppingCartService.$userShoppingCart;

  ngOnDestroy(): void {
    // Retirer la classe 'no-scroll' du body quand la modale est fermée
    document.body.classList.remove('no-scroll');
  }
}
