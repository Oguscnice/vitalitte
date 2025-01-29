import {Component, inject, OnInit} from '@angular/core';
import {AdminDeliveryOptionSignalService} from "../../../shared/services/admin-delivery-option-signal.service";
import {NgClass} from "@angular/common";
import {CustomCurrencyPipe} from "../../../../../shared/services/pipes/custom-currency.pipe";
import {ModalSignalService} from "../../../../../shared/services/modal-signal.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {priceValidator} from "../../../shared/validators/priceValidators";
import {DeliveryOptionDto} from "../../../../../shared/interfaces/DeliveryOptionDto";

@Component({
  selector: 'app-edit-delete-delivery-option',
  standalone: true,
  imports: [NgClass, CustomCurrencyPipe, ReactiveFormsModule],
  templateUrl: './edit-delete-delivery-option.component.html',
  styles:  [`@import "../../../scss/admin-general.scss";`]
})
export class EditDeleteDeliveryOptionComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  formHelper = inject(FormHelperService);
  modalSignal = inject(ModalSignalService);
  adminDeliveryOptionSignal = inject(AdminDeliveryOptionSignalService);
  deliveryOptions = this.adminDeliveryOptionSignal.$deliveryOptions;

  editDeliveryOptionForm = this.formBuilder.group({
    slug: ['', [Validators.required]],
    name : ['', [Validators.required, Validators.maxLength(255)]],
    price : [0, [Validators.required, priceValidator()]],
    estimatedDeliveryTime : ['', [Validators.required, Validators.maxLength(255)]],
    carrier : ['', [Validators.required, Validators.maxLength(255)]],
    description : ['', [Validators.maxLength(500)]],
    isExpress: [false],
    isAvailable: [false]
  });

  ngOnInit(): void {
    this.adminDeliveryOptionSignal.getAll();
  }

  edit(deliveryOption: DeliveryOptionDto): void {
    this.editDeliveryOptionForm.get('slug')!.setValue(deliveryOption.slug);
    this.editDeliveryOptionForm.get('name')!.setValue(deliveryOption.name);
    this.editDeliveryOptionForm.get('price')!.setValue(deliveryOption.price);
    this.editDeliveryOptionForm.get('estimatedDeliveryTime')!.setValue(deliveryOption.estimatedDeliveryTime);
    this.editDeliveryOptionForm.get('carrier')!.setValue(deliveryOption.carrier);
    this.editDeliveryOptionForm.get('description')!.setValue(deliveryOption.description);
    this.editDeliveryOptionForm.get('isExpress')!.setValue(deliveryOption.isExpress);
    this.editDeliveryOptionForm.get('isAvailable')!.setValue(deliveryOption.isAvailable);
    setTimeout(() =>
      document.getElementById('editDeliveryOption')!.scrollIntoView()
      , 20)
  }

  submitEditDeliveryOptionForm(): void {
    this.formHelper.isFormSubmit = true;
    if (this.editDeliveryOptionForm.valid) {
      const EDITED_DELIVERY_OPTION: DeliveryOptionDto = this.formHelper.formatFormToDto<DeliveryOptionDto>(this.editDeliveryOptionForm);
      this.adminDeliveryOptionSignal.put(EDITED_DELIVERY_OPTION);
      this.formHelper.resetAllValues(this.editDeliveryOptionForm);
    }
  }
}
