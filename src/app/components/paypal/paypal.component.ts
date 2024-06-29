import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule, IClientAuthorizeCallbackData } from 'ngx-paypal';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";

@Component({
  standalone: true,
  imports: [ NgxPayPalModule ],
  selector: 'app-paypal',
  template: '<ngx-paypal [config]="payPalConfig"></ngx-paypal>',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent {

  // @Input() shoppingCart! : ShoppingCartNotebookService | ShoppingCartWorkshopService
  @Output() responsePaypal: EventEmitter<'success' | 'cancel' | 'error'> = new EventEmitter();

  private shoppingCart = inject(ShoppingCartService);
  public payPalConfig? : IPayPalConfig;

  ngOnInit(): void {
      this.initConfig();
  }

  private initConfig(): void {

      this.payPalConfig = {
          currency: 'EUR',
          clientId: 'AYYE0u97Tpi9PeuAMjG1gub3z0j9o65rmMhXfbzotEK5T9QPLumA5-VyFnFgpt_oD1EVw2nO8X9n46ju',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'EUR',
                      value: this.shoppingCart.totalPrice().toString(),
                      breakdown: {
                          item_total: {
                              currency_code: 'EUR',
                              value: this.shoppingCart.totalPrice().toString()
                          }
                      }
                  },
                  items: this.shoppingCart.itemsForPaypal()
              }]
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
              this.responsePaypal.emit('success')
              this.shoppingCart.cleanLocalStorage()
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.responsePaypal.emit('cancel')
          },
          onError: err => {
              console.log('OnError', err);
              this.responsePaypal.emit('error')
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
              // this.resetStatus();
          }
      };
  }
}

let onClientAuthorizationData : any = {
    "id": "2MS34461WD214490V",
    "intent": "CAPTURE",
    "status": "COMPLETED",
    "purchase_units": [
        {
            "reference_id": "default",
            "amount": {
                "currency_code": "EUR",
                "value": "0.50",
                "breakdown": {
                    "item_total": {
                        "currency_code": "EUR",
                        "value": "0.50"
                    },
                    "shipping": {
                        "currency_code": "EUR",
                        "value": "0.00"
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
                        "value": "0.00"
                    }
                }
            },
            "payee": {
                "email_address": "sb-kdkmc27077755@business.example.com",
                "merchant_id": "ZM8U2CDM48YLE"
            },
            "description": "la-foret-enchantee",
            "soft_descriptor": "PAYPAL *TEST STORE",
            "items": [
                {
                    "name": "la-foret-enchantee",
                    "unit_amount": {
                        "currency_code": "EUR",
                        "value": "0.50"
                    },
                    "tax": {
                        "currency_code": "EUR",
                        "value": "0.00"
                    },
                    "quantity": "1"
                }
            ],
            "shipping": {
                "name": {
                    "full_name": "Gus Cometto"
                },
                "address": {
                    "address_line_1": "10 rue Saint-Nestor",
                    "admin_area_2": "Lyon",
                    "postal_code": "69008",
                    "country_code": "FR"
                }
            },
            "payments": {
                "captures": [
                    {
                        "id": "2J210318G49192317",
                        "status": "COMPLETED",
                        "amount": {
                            "currency_code": "EUR",
                            "value": "0.50"
                        },
                        "final_capture": true,
                        "seller_protection": {
                            "status": "NOT_ELIGIBLE"
                        },
                        "create_time": "2024-05-02T12:39:05Z",
                        "update_time": "2024-05-02T12:39:05Z"
                    }
                ]
            }
        }
    ],
    "payer": {
        "name": {
            "given_name": "Gus",
            "surname": "Cometto"
        },
        "email_address": "guillaume.cometto@gmail.com",
        "payer_id": "APZQ7PPDQQN3J",
        "address": {
            "country_code": "FR"
        }
    },
    "create_time": "2024-05-02T12:38:05Z",
    "update_time": "2024-05-02T12:39:05Z",
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2MS34461WD214490V",
            "rel": "self",
            "method": "GET"
        }
    ]

}
