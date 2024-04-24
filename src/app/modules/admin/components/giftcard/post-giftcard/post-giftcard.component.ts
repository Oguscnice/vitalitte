import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateGiftCard } from '../../../interfaces/GiftCard';
import { futureDateValidator } from '../../../validators/pastDate';
import { TransformApiService } from '../../../services/transform-api.service';
import { NgClass, NgIf } from '@angular/common';
import { priceValidator } from '../../../validators/priceValidators';

@Component({
  selector: 'app-post-giftcard',
  standalone: true,
  imports: [ ReactiveFormsModule, NgClass, NgIf ],
  templateUrl: './post-giftcard.component.html',
  styles: [` @import "../../../scss/admin-general.scss";
            .toggle-switch {
              .toggle-label {
                background-color: $lilac-dark;
              }
            } `]
})
export class PostGiftcardComponent {

  private formBuilder = inject(FormBuilder)
  private transformApiService = inject(TransformApiService);

  @Output() newGiftCard: EventEmitter<CreateGiftCard> = new EventEmitter();

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  isPercentage: boolean = false;

  newGiftcardForm = this.formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    rising : ['', [Validators.required, priceValidator()]],
    expiryDate: ['', [Validators.required, futureDateValidator()]],
  });

  changePercentageBoolean(): void {
    this.isPercentage = !this.isPercentage;
  }

  submitNewGiftCardForm(): void {

    this.isFormSubmit = true
    
    if(this.newGiftcardForm.valid){
      let createGiftCard : CreateGiftCard = this.transformApiService.postGiftCard(this.newGiftcardForm, this.isPercentage)
      this.newGiftCard.emit(createGiftCard);
      // Après avoir envoyé, on remet les variables à zéro
      this.isFormSubmit = false;
      this.isFormVisible = false;
      this.newGiftcardForm.reset()
    }
  }

}
