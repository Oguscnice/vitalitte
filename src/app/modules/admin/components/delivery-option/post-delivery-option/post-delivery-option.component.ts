import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {priceValidator} from "../../../shared/validators/priceValidators";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {AdminDeliveryOptionSignalService} from "../../../shared/services/admin-delivery-option-signal.service";
import {CreateDeliveryOption} from "../../../shared/interfaces/CreateDeliveryOption";

@Component({
  selector: 'app-post-delivery-option',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './post-delivery-option.component.html',
  styles: [`
    @import "../../../scss/admin-general.scss";
  `]
})
export class PostDeliveryOptionComponent {

  private formBuilder = inject(FormBuilder);
  private formHelper = inject(FormHelperService);
  private adminDeliveryOptionSignal = inject(AdminDeliveryOptionSignalService);
  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  newDeliveryOptionForm = this.formBuilder.group({
    name : ['', [Validators.required, Validators.maxLength(255)]],
    price : ['', [Validators.required, priceValidator()]],
    estimatedDeliveryTime : ['', [Validators.required, Validators.maxLength(255)]],
    isExpress : [false],
    carrier : ['', [Validators.required, Validators.maxLength(255)]],
    description : ['', [Validators.maxLength(500)]],
  });

  changeBoolean(value: 'isExpress' | 'isAvailable'): void {
    const ACTUAL_VALUE = this.newDeliveryOptionForm.get(value)!.value;
    this.newDeliveryOptionForm.get(value)!.setValue(!ACTUAL_VALUE);
  }

  submitNewDeliveryOptionForm(): void {
    this.isFormSubmit = true;
    if (this.newDeliveryOptionForm.valid) {
      const CREATED_DELIVERY_OPTION: CreateDeliveryOption = this.formHelper.formatFormToDto<CreateDeliveryOption>(this.newDeliveryOptionForm)
      console.log(this.newDeliveryOptionForm.value)
      console.log(CREATED_DELIVERY_OPTION)
      this.adminDeliveryOptionSignal.post(CREATED_DELIVERY_OPTION);
      this.resetAllValues();
    }
  }

  transformToCreateDeliveryOption(form : FormGroup): CreateDeliveryOption {
    return {
      ...form.value,
      expiryDate : new Date(form.value.expiryDate),
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.newDeliveryOptionForm.reset();
  }

}
