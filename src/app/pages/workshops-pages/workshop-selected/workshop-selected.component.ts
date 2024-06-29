import { DecimalPipe } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { H1Component } from 'src/app/components/h1/h1.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PaypalComponent } from 'src/app/components/paypal/paypal.component';
import { AnguilleComponent } from 'src/app/components/anguille/anguille.component';
import { CreateInscription } from 'src/app/shared/interfaces/Inscription';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { phoneValidator } from 'src/app/shared/validators/PhoneValidator';
import { quantityValidator } from 'src/app/shared/validators/QuantityValidator';
import {FormHelperService} from "../../../modules/admin/shared/services/form-helper.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";

@Component({
  standalone: true,
  imports: [ H1Component, ReactiveFormsModule, AnguilleComponent, ModalComponent, PaypalComponent, DecimalPipe ],
  selector: 'app-workshop-selected',
  templateUrl: './workshop-selected.component.html',
  styles: [`
            @import "../../../scss/variables.scss";
            @import "../../../scss/forms.scss";

            .workshop-content,
            .workshop-resgistrations-free,
            .btn-normal,
            .total-price,
            .price-per-person {
              margin-top: $normal-margin;
            }

            .workshop-resgistrations-free {
              font-weight: bold;
            }

            .price-per-person {
              margin-top : $normal-margin;
              margin-right: $half-margin;
            }

          `]
})
export class WorkshopSelectedComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private formBuilder = inject(FormBuilder);
  private formHelper = inject(FormHelperService);
  route = inject(ActivatedRoute);

  workshopSlug! : WorkshopDto['slug'];
  currentWorkshop!: WorkshopDto | null;

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  newInscriptionForm = this.formBuilder.group({
    lastname: ['', [Validators.required, Validators.maxLength(255)]],
    firstname : ['', [Validators.required, Validators.maxLength(255)]],
    phone: ['', [Validators.required, phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    quantity: [0, [Validators.required, quantityValidator()]],
    workshopDto: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.findWorkshopByUrlSlug();
    this.subscribeToWorkShopByslugSignal();
  }

  private findWorkshopByUrlSlug(): void {
    this.route.params.subscribe((params) => this.dataSignal.getWorkshopBySlug(params['workshopSlug']));
  }

  private subscribeToWorkShopByslugSignal(): void {
    this.dataSignal.$workshopBySlug.subscribe((workshop) => {
      this.currentWorkshop = workshop;
      this.newInscriptionForm.get('workshopDto')!.setValue(this.formHelper.jsonStringify(this.currentWorkshop));
    })
  }

  isWorkshopInFuture(workshop: WorkshopDto): boolean {
    const TOMORROW = new Date();
    TOMORROW.setDate(TOMORROW.getDate() + 1);
    return new Date(workshop.date) > TOMORROW;
  }

  registrationsFree(): number {
    if (this.dataSignal.$workshopsDisponibilities().length > 0) {
      const WORKSHOP_DISPO = this.dataSignal.$workshopsDisponibilities().find(item => item.workshopSlug === this.currentWorkshop?.slug)
      if (this.currentWorkshop) {
        return this.currentWorkshop.registrations - WORKSHOP_DISPO!.disponibilities;
      }
    }
    return 0;
  }

  changePhoneValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.newInscriptionForm.get('phone')!.setValue(inputElement.value);
  }

  totalPrice(): number {
    if (this.newInscriptionForm.get('quantity')!.value) {
      return this.newInscriptionForm.get('quantity')!.value! * this.currentWorkshop!.price;
    }
    return 0;
  }

  addCartInscription(): void {

    this.isFormSubmit = true;

    if (this.newInscriptionForm.valid) {
      const CREATED_INSCRIPTION: CreateInscription = this.formHelper.formatFormAddValue(this.newInscriptionForm, 'workshopDto');
      this.dataSignal.postInscription(CREATED_INSCRIPTION);
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.newInscriptionForm.reset();
    this.isFormSubmit = false;
    this.isFormVisible = false;
  }
}
