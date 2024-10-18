import {Component, inject, OnInit, Signal} from '@angular/core';
import {CustomCurrencyPipe} from "../../shared/services/pipes/custom-currency.pipe";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaypalComponent} from "../paypal/paypal.component";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {FormHelperService} from "../../modules/admin/shared/services/form-helper.service";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {AsyncPipe, NgClass, TitleCasePipe} from "@angular/common";
import {ApiBanService} from "../../modules/admin/shared/services/api/api-ban.service";
import {BaseComponent} from "../../base.component";
import {phoneValidator} from "../../shared/validators/PhoneValidator";
import {IPayer} from "ngx-paypal/lib/models/paypal-models";
import {VITALITTE_PROJECT} from "../../shared/variables/AppConfig";
import {DeliveryOptionDto} from "../../shared/interfaces/DeliveryOptionDto";
import {GiftCardDto} from "../../shared/interfaces/GiftCard";
import {AnguilleSignalService} from "../../shared/services/anguille-signal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [
    CustomCurrencyPipe,
    PaypalComponent,
    ReactiveFormsModule,
    NgClass,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss'
})
export class CheckoutFormComponent extends BaseComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private dataSignal = inject(DataSignalService);
  private anguilleSignal = inject(AnguilleSignalService);
  private router = inject(Router);
  formHelper = inject(FormHelperService);
  shoppingCart = inject(ShoppingCartService);
  apiBanService = inject(ApiBanService);

  protected readonly COUNTRIES = COUNTRIES;
  protected readonly VITALITTE_PROJECT = VITALITTE_PROJECT;
  userAddress: string = "";
  deliveryOptions = this.dataSignal.$deliveryOptionAvailable;
  deliveryOptionSelected$: Signal<DeliveryOptionDto | null> = this.shoppingCart.$userDeliveryOption;
  giftCardActive$: Signal<GiftCardDto | null> = this.shoppingCart.$userGiftCardActive;

  isDeliveryDropdownOpen: boolean = false;
  isPrefixDropdownOpen: boolean = false;
  isCountryCodeDropdownOpen: boolean = false;
  isFormSubmit: boolean = false;
  inputValueGiftCard: string = "";
  countrySelected: CountryCode = { name: "France", code: "FR"};

  newOrder = this.formBuilder.group({
    name: this.formBuilder.group({
      given_name: ['', [Validators.required, Validators.maxLength(255)]],
      surname: ['', [Validators.required, Validators.maxLength(255)]],
    }),
    email_address : ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    address: this.formBuilder.group({
      country_code: ['FR', [Validators.required]],
      address_line_1: ['', [Validators.required]],
      address_line_2: ['', [Validators.maxLength(255)]],
      admin_area_1: [''],
      admin_area_2: [''],
      postal_code: ['', [Validators.required]],
    }),
    national_number: ['', [Validators.required, phoneValidator()]]
  });

  ngOnInit(): void {
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.subscriptions.push(
      this.newOrder.valueChanges.subscribe(value => this.shoppingCart.setShoppingCartChanges())
    )
  }

  isPaypalVisible(): boolean {
    if (this.newOrder.valid && (this.deliveryOptionSelected$() && this.shoppingCart.$userShoppingCart().products.length > 0) || this.shoppingCart.$userShoppingCart().products.length === 0) {
      return true;
    }
    return false;
  }

  toggleDropdown(value: boolean, dropdownClicked : 'Delivery' | 'Prefix' | 'CountryCode'): void {
    this.isDeliveryDropdownOpen = false;
    this.isPrefixDropdownOpen = false;
    this.isCountryCodeDropdownOpen = false;
    this[`is${dropdownClicked}DropdownOpen`] = value;
  }

  private getEmailValue(): string | null | undefined {
    return this.newOrder.get('email_address')?.value
  }

  getDeliveryOptionValueForm(): string {
    if (this.deliveryOptionSelected$()) {
      return `${this.deliveryOptionSelected$()!.name} (${this.deliveryOptionSelected$()!.carrier})`;
    }
    return "";
  }

  onKeyUpGiftCard(event: KeyboardEvent): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    this.inputValueGiftCard = INPUT_ELEMENT.value;
  }

  checkGiftCard(): void {
    const emailAddressValue = this.getEmailValue();
    if (this.newOrder.controls.email_address.valid && this.inputValueGiftCard && (this.inputValueGiftCard !== this.giftCardActive$()?.code)) {
      this.dataSignal.checkGiftCard(this.inputValueGiftCard, emailAddressValue!);
    }
    this.inputValueGiftCard = "";
  }

  onAddressClicked(addressClicked: any): void {
    this.newOrder.get('address.address_line_1')!.setValue(addressClicked.properties.name);
    this.newOrder.get('address.postal_code')!.setValue(addressClicked.properties.postcode);
    this.newOrder.get('address.admin_area_2')!.setValue(addressClicked.properties.city);

    this.userAddress = addressClicked.properties.label
  }

  onCountryClicked(country: CountryCode): void {
    this.newOrder.get('address.country_code')!.setValue(country.code);
    this.countrySelected = country;
  }

  getFormConvertToUserCheckoutInfo(form: FormGroup): IPayer {
    return form.value;
  }

  submitCheckoutForm(): void {
    this.isFormSubmit = true;
    const requiredDeliverySystem = (this.deliveryOptionSelected$() !== null || (this.deliveryOptionSelected$() === null && this.shoppingCart.$userShoppingCart().products.length < 1))
    if (this.giftCardActive$()) {
      this.subscriptions.push(
        this.dataSignal.verifyIfGiftCardIsAlreadyUsed(this.giftCardActive$()!.code, this.getEmailValue()!).subscribe({
          next: (alreadyUsed) => {
            if (alreadyUsed) {
              this.anguilleSignal.changeMessage("Carte cadeau déjà utilisée par cet utilisateur(trice).");
              this.shoppingCart.setGiftCardActive(null);
              this.router.navigate(['/panier']);
            } else {
            //TODO que faire au click de la commande ?
            }
          },
          error: (err) => this.anguilleSignal.changeMessage(err.error.message),
        })
      )
    } else {
      //TODO que faire au click de la commande ?
      if (this.deliveryOptionSelected$() && this.newOrder.valid) {
        this.resetAllValues();
      }
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    // this.shoppingCart.cleanLocalStorage();
  }
}

export interface CountryCode {
  name: string,
  code: string
}

export const COUNTRIES: CountryCode[] = [
  { name: 'Albania', code: 'AL' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Greece', code: 'GR' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Italy', code: 'IT' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kosovo', code: 'XK' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Malta', code: 'MT' },
  { name: 'Moldova', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Montenegro', code: 'ME' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'North Macedonia', code: 'MK' },
  { name: 'Norway', code: 'NO' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russia', code: 'RU' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Serbia', code: 'RS' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Vatican City', code: 'VA' }
];
