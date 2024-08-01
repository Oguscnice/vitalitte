import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreateGiftCard } from '../../../shared/interfaces/CreateGiftCard';
import { futureDateValidator } from '../../../shared/validators/pastDate';
import { NgClass } from '@angular/common';
import { priceValidator } from '../../../shared/validators/priceValidators';
import {AdminGiftCardSignalService} from "../../../shared/services/admin-giftcard-signal.service";

@Component({
  selector: 'app-post-giftCard',
  standalone: true,
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './post-giftCard.component.html',
  styles: [` @import "../../../scss/admin-general.scss";
            .toggle-switch {
              .toggle-label {
                background-color: $lilac-dark;
              }
            }
  `]
})
export class PostGiftCardComponent {

  private formBuilder = inject(FormBuilder)
  private adminGiftCardSignal = inject(AdminGiftCardSignalService);

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  newGiftcardForm = this.formBuilder.group({
    code : ['', [Validators.required, Validators.maxLength(50)]],
    rising : ['', [Validators.required, priceValidator()]],
    expiryDate : ['', [Validators.required, futureDateValidator()]],
    isPercentage : [false]
  });

  changePercentageBoolean(): void {
    const ACTUAL_VALUE = this.isPercent();
    this.newGiftcardForm.get('isPercentage')!.setValue(!ACTUAL_VALUE);
  }

  isPercent(): boolean {
    return this.newGiftcardForm.get('isPercentage')!.value || false;
  }

  submitNewGiftCardForm(): void {
    this.isFormSubmit = true;
    if (this.newGiftcardForm.valid) {
      const CREATED_GIFTCARD: CreateGiftCard = this.transformToCreateGiftCard(this.newGiftcardForm)
      this.adminGiftCardSignal.post(CREATED_GIFTCARD);
      this.resetAllValues();
    }
  }

  transformToCreateGiftCard(form : FormGroup): CreateGiftCard {
    return {
      ...form.value,
      expiryDate : new Date(form.value.expiryDate),
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.newGiftcardForm.reset();
  }
}
