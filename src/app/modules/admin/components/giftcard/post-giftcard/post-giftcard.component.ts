import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreateGiftCard } from '../../../shared/interfaces/CreateGiftCard';
import { futureDateValidator } from '../../../shared/validators/pastDate';
import { NgClass } from '@angular/common';
import { priceValidator } from '../../../shared/validators/priceValidators';
import {AdminGiftCardSignalService} from "../../../shared/services/admin-giftcard-signal.service";

@Component({
  selector: 'app-post-giftCard',

  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './post-giftCard.component.html',
  styles: [`
    @use "../../../scss/admin-general.scss";
    @use "../../../scss/admin-form.scss";
    @use "../../../scss/admin-button.scss";
    @use "../../../scss/admin-toggle.scss";
    @use "../../../../../scss/forms.scss";
    @use "../../../../../scss/dropdowns.scss";
    @use "../../../../../scss/buttons.scss";
    @use "../../../../../scss/variables.scss" as variablesScss;

    .toggle-switch {
      .toggle-label {
        background-color: variablesScss.$lilac-dark;
      }
    }
  `]
})
export class PostGiftCardComponent {

  private formBuilder = inject(FormBuilder)
  private adminGiftCardSignal = inject(AdminGiftCardSignalService);

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  newGiftCardForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    rising: ['', [Validators.required, priceValidator()]],
    expiryDate: ['', [Validators.required, futureDateValidator()]],
    isPercentage: [false],
    isSingleUse: [false]
  });

  changePercentageBoolean(): void {
    const ACTUAL_VALUE = this.isPercent();
    this.newGiftCardForm.get('isPercentage')!.setValue(!ACTUAL_VALUE);
  }

  changeSingleUseBoolean(): void {
    const ACTUAL_VALUE = this.isSingleUsage();
    this.newGiftCardForm.get('isSingleUse')!.setValue(!ACTUAL_VALUE);
  }

  isPercent(): boolean {
    return this.newGiftCardForm.get('isPercentage')!.value || false;
  }

  isSingleUsage(): boolean {
    return this.newGiftCardForm.get('isSingleUse')!.value || false;
  }

  submitNewGiftCardForm(): void {
    this.isFormSubmit = true;
    if (this.newGiftCardForm.valid) {
      const CREATED_GIFTCARD: CreateGiftCard = this.transformToCreateGiftCard(this.newGiftCardForm)
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
    this.newGiftCardForm.reset();
  }
}
