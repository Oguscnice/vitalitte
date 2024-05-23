import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { H1Component } from 'src/app/components/h1/h1.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PaypalComponent } from 'src/app/components/paypal/paypal.component';
import { TransformApiService } from 'src/app/modules/admin/services/transform-api.service';
import { AnguilleComponent } from 'src/app/shared/components/anguille/anguille.component';
import { CreateInscription } from 'src/app/shared/interfaces/Inscription';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ShoppingCartWorkshopService } from 'src/app/shared/services/shopping-cart-workshop.service';
import { phoneValidator } from 'src/app/shared/validators/PhoneValidator';
import { quantityValidator } from 'src/app/shared/validators/QuantityValidator';

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
            .price-per-person
             {
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
export class WorkshopSelectedComponent extends BaseComponent{

  protected route = inject(ActivatedRoute);
  private apiRequestsService = inject(ApiRequestsService);
  protected shoppingCartWorkshop = inject(ShoppingCartWorkshopService);
  private formBuilder = inject(FormBuilder);
  private transformApiService = inject(TransformApiService);

  protected workshopSlug! : WorkshopDto['slug'];
  protected workshopSelected! : WorkshopDto;
  protected inscriptionsCount : number = 0;
  protected inscriptionSlugNotConfirmed! : string;
  private quantityChangeSubscription! : Subscription;
  private oldQuantityChange : number = 0;

  protected isFormVisible: boolean = false;
  protected isFormSubmit: boolean = false;

  modalVisible : boolean = false;
  modalText! : string;

  newInscriptionForm = this.formBuilder.group({
    lastname: ['', [Validators.required, Validators.maxLength(255)]],
    firstname : ['', [Validators.required, Validators.maxLength(255)]],
    phone: ['', [Validators.required, phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    quantity: [0, [Validators.required, quantityValidator()]]
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.workshopSlug = params['workshopSlug'];
      this.findWorkshopBySlug()
      this.findInscriptionsByWorkshopBySlug();
    });

    this.shoppingCartWorkshop.cleanLocalStorage();

    // Surveiller les changements de quantity pour adapter le ShoppingCartWorkshop
    this.quantityChangeSubscription = this.newInscriptionForm.get('quantity')!.valueChanges.subscribe({
      next: (value) => {
        if(value){
          if(value > this.oldQuantityChange) {
            this.shoppingCartWorkshop.addItem(this.workshopSlug);
          } else if(value < this.oldQuantityChange) {
            this.shoppingCartWorkshop.subtractItemToShoppingCart(this.workshopSlug);
          }
        } else if(!value) {
          this.shoppingCartWorkshop.deleteItemToShoppingCart(this.workshopSlug);
        }
        this.oldQuantityChange = value!;
      },
      error: (err) => console.error('Error observing quantity changes:', err),
      complete: () => console.log('Observation complete')
    });
  }
  

  override ngOnDestroy(): void {
    if (this.quantityChangeSubscription) {
      this.quantityChangeSubscription.unsubscribe();
    }
  }

  findWorkshopBySlug(): void {
    this.subscriptions.push(
      this.apiRequestsService.getWorkshopBySlug(this.workshopSlug).subscribe({
        next: (workshop) => {
          this.workshopSelected = workshop;
          this.shoppingCartWorkshop.items = [workshop];
        },
        error: (err) => this.changeMessage(err.error.message)
      })
    )
  }

  findInscriptionsByWorkshopBySlug(): void {
    this.subscriptions.push(
      this.apiRequestsService.getInscriptionsCounterByWorkshop(this.workshopSlug).subscribe({
        next: (count) => this.inscriptionsCount = count,
        error: (err) => this.changeMessage(err.error.message)
      })
    )
  }

  resgistrationsFree(): number {
    return this.workshopSelected.registrations - this.inscriptionsCount;
  }

  changePhoneValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.newInscriptionForm.get('phone')!.setValue(inputElement.value);
  }

  postNewInscription(): void {

    this.isFormSubmit = true;

    if(this.newInscriptionForm.valid) {
      const inscription : CreateInscription = this.transformApiService.postInscription(this.newInscriptionForm, this.workshopSelected);

      this.subscriptions.push(
        this.apiRequestsService.postInscription(inscription).subscribe({
          next: (res) => {
            this.inscriptionSlugNotConfirmed = res.message;
            this.findWorkshopBySlug();
            this.findInscriptionsByWorkshopBySlug();
          },
          error: (err) => this.changeMessage(err.error.message)
        })
      )
    }
  }

  confirmNewInscription(): void {
    this.subscriptions.push(
      this.apiRequestsService.confirmInscriptionBySlug(this.inscriptionSlugNotConfirmed).subscribe({
        next: (res) => {          
          this.modalText = res.message;
          this.findWorkshopBySlug();
          this.findInscriptionsByWorkshopBySlug();
        },
        error: (err) => this.changeMessage(err.error.message)
      })
    )
  }

  responsePaypal(event: 'success' | 'cancel' | 'error'): void {
    this.modalVisible = true;
    if(event === 'success'){
      this.confirmNewInscription();
    } else if(event === 'cancel'){
      this.modalText = 'Annulation de la transaction Paypal.'
    } else if(event === 'error'){
      this.modalText = 'Erreur Paypal.'
    }

  }
  
  responseForModal(response: boolean): void {
    this.modalVisible = false;
  }
}
