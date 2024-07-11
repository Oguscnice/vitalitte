import {Component, inject, Input, OnInit, Signal} from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ModalSignalService} from "../../shared/services/modal-signal.service";
import {VITALITTE_PROJECT} from "../../shared/variables/AppConfig";
import {IPayer} from "ngx-paypal/lib/models/paypal-models";
import {DeliveryOptionDto} from "../../shared/interfaces/DeliveryOptionDto";
import {GiftCardDto} from "../../shared/interfaces/GiftCard";
import {ShoppingCart} from "../../shared/interfaces/ShoppingCart";
import {BaseComponent} from "../../base.component";

@Component({
  standalone: true,
  imports: [ NgxPayPalModule ],
  selector: 'app-paypal',
  template: '<ngx-paypal [config]="payPalConfig"></ngx-paypal>',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent extends BaseComponent implements OnInit {

  @Input() userInfo!: IPayer;

  private shoppingCart = inject(ShoppingCartService);
  private modalSignal = inject(ModalSignalService);
  deliveryOptionSelected$: Signal<DeliveryOptionDto | null> = this.shoppingCart.$userDeliveryOption;
  giftCardActive$: Signal<GiftCardDto | null> = this.shoppingCart.$userGiftCardActive;

  protected payPalConfig? : IPayPalConfig;

  ngOnInit(): void {
    this.subscribeToShoppingCartSignalChanges();
  }

  subscribeToShoppingCartSignalChanges(): void {
    this.subscriptions.push(
      this.shoppingCart.$shoppingCartSignalChanges.subscribe(changes => {
        this.initConfig();
        console.log("change paypal")
      })
    )
  }


  private initConfig(): void {

    const SHIPPING_PRICE = this.shoppingCart.getDeliveryPrice();
    const SHIPPING_DISCOUNT = this.shoppingCart.isDeliveryFree() ? this.shoppingCart.getDeliveryPrice() : 0;
    const DISCOUNT = this.giftCardActive$() && !this.giftCardActive$()!.percentage ? this.giftCardActive$()!.rising : 0;
    const ITEM_TOTAL_PRICE = this.shoppingCart.getTotalPriceWithGiftCardAndDelivery(true, false);
    const TOTAL_AMOUNT = ITEM_TOTAL_PRICE + SHIPPING_PRICE - SHIPPING_DISCOUNT - DISCOUNT;

    this.payPalConfig = {
          currency: 'EUR',
          clientId: VITALITTE_PROJECT.front.paypal.clientId,
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                amount: {
                  currency_code: 'EUR',
                  value: TOTAL_AMOUNT.toString(),
                  breakdown: {
                    item_total: {
                      currency_code: 'EUR',
                      value: ITEM_TOTAL_PRICE.toString()
                    },
                    ...(this.deliveryOptionSelected$() && {
                      shipping: {
                        currency_code: 'EUR',
                        value: SHIPPING_PRICE.toString(),
                        breakdown: {
                          item_total: {
                            currency_code: 'EUR',
                            value: SHIPPING_PRICE.toString()
                          }
                        },
                      },
                    }),
                    // Inclure la remise sur les frais de port la commande dépasse les 70euros
                    ...(SHIPPING_DISCOUNT > 0 && {
                      shipping_discount: {
                        currency_code: 'EUR',
                        value: SHIPPING_DISCOUNT.toString(),
                        breakdown: {
                          item_total: {
                            currency_code: 'EUR',
                            value: SHIPPING_DISCOUNT.toString()
                          }
                        }
                      }
                    }),
                    ...(DISCOUNT > 0 && {
                      discount: {
                        currency_code: "EUR",
                        value: DISCOUNT.toString()
                      }
                    }),
                  },
                },
                items: this.shoppingCart.itemsForPaypal()
              }],
            payer: this.userInfo,
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then(() => {
                  console.log('onApprove - you can get full order details inside onApprove: ');
              });

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
              this.shoppingCart.paymentSuccess();
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.modalSignal.showModal("Transaction Annulée par le client.", false);
          },
          onError: err => {
              console.log('OnError', err);
              this.modalSignal.showModal("Erreur Serveur chez Paypal, merci de recommencer.", false);
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
          }
      };
  }
}

let onClientAuthorizationData : any = {
  "id": "4FY73011TD6370537",
  "intent": "CAPTURE",
  "status": "COMPLETED",
  "purchase_units": [
    {
      "reference_id": "default",
      "amount": {
        "currency_code": "EUR",
        "value": "82.18",
        "breakdown": {
          "item_total": {
            "currency_code": "EUR",
            "value": "82.18"
          },
          "shipping": {
            "currency_code": "EUR",
            "value": "1.05"
          },
          "handling": {
            "currency_code": "EUR",
            "value": "0.00"
          },
          "insurance": {
            "currency_code": "EUR",
            "value": "0.00"
          },
          "shipping_discount": {
            "currency_code": "EUR",
            "value": "1.05"
          }
        }
      },
      "payee": {
        "email_address": "sb-kdkmc27077755@business.example.com",
        "merchant_id": "ZM8U2CDM48YLE"
      },
      "description": "Carnet : Le Voyageur Temporel",
      "soft_descriptor": "PAYPAL *TEST STORE",
      "items": [
        {
          "name": "Carnet : Le Voyageur Temporel",
          "unit_amount": {
            "currency_code": "EUR",
            "value": "3.80"
          },
          "tax": {
            "currency_code": "EUR",
            "value": "0.00"
          },
          "quantity": "3"
        },
        {
          "name": "Carnet : Le Trésor de l'Océan",
          "unit_amount": {
            "currency_code": "EUR",
            "value": "2.85"
          },
          "tax": {
            "currency_code": "EUR",
            "value": "0.00"
          },
          "quantity": "4"
        },
        {
          "name": "Carnet : le braise",
          "unit_amount": {
            "currency_code": "EUR",
            "value": "11.88"
          },
          "tax": {
            "currency_code": "EUR",
            "value": "0.00"
          },
          "quantity": "1"
        },
        {
          "name": "Atelier : Atelier Carnets Artisanaux du 2024-10-04T07:00:00",
          "unit_amount": {
            "currency_code": "EUR",
            "value": "9.50"
          },
          "tax": {
            "currency_code": "EUR",
            "value": "0.00"
          },
          "quantity": "5"
        }
      ],
      "shipping": {
        "name": {
          "full_name": "Guillaume Cometto"
        },
        "address": {
          "address_line_1": "10 rue Saint-Nestor",
          "admin_area_2": "LYON",
          "postal_code": "69008",
          "country_code": "FR"
        }
      },
      "payments": {
        "captures": [
          {
            "id": "1GJ97957F52044839",
            "status": "COMPLETED",
            "amount": {
              "currency_code": "EUR",
              "value": "82.18"
            },
            "final_capture": true,
            "seller_protection": {
              "status": "NOT_ELIGIBLE"
            },
            "create_time": "2024-07-11T13:46:48Z",
            "update_time": "2024-07-11T13:46:48Z"
          }
        ]
      }
    }
  ],
  "payer": {
    "name": {
      "given_name": "Guillaume",
      "surname": "Cometto"
    },
    "email_address": "guillaume.cometto@gmail.com",
    "payer_id": "APZQ7PPDQQN3J",
    "address": {
      "address_line_1": "10 Rue Saint Nestor",
      "address_line_2": "sonnez",
      "admin_area_2": "Lyon",
      "postal_code": "69008",
      "country_code": "FR"
    }
  },
  "create_time": "2024-07-11T13:46:21Z",
  "update_time": "2024-07-11T13:46:48Z",
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v2/checkout/orders/4FY73011TD6370537",
      "rel": "self",
      "method": "GET"
    }
  ]
}
