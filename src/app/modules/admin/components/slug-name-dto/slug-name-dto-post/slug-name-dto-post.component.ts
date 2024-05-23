import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlugNameDto } from '../../../interfaces/SlugNameDto';

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule ],
  selector: 'app-slug-name-dto-post',
  template: `
              <div class="title-functionality flex center">
                <h4>Créer une {{ type }}:</h4>
                <i class="fa-solid fa-circle-plus"
                   (click)="isFormVisible = !isFormVisible"
                   [ngClass]="{'rotated45': isFormVisible}"></i>
              </div>
              @if (isFormVisible) {
                <form (ngSubmit)="(newItemForm.valid)"
                     [formGroup]="newItemForm"
                     #myForm="ngForm">

                  <fieldset class="flex column">
                    <label for="name">Nom :</label>
                    <input type="text"
                          id="name"
                          placeholder="Nom..."
                          formControlName="name"
                          autocomplete="off"/>

                    @if (isFormSubmit && myForm.submitted && newItemForm.controls['name'].invalid) {
                      <div>
                        @if (newItemForm.controls.name.errors?.['required']) {
                          <small>Le nom est obligatoire.</small>
                        } @else if (newItemForm.controls.name.errors?.['maxlength']) {
                          <small>Le nom ne doit pas dépasser 255 charactères.</small>
                        }
                      </div>
                    }
                  </fieldset>
                  
                  <button class="btn-submit-admin"
                          type="submit"
                          (click)="submitNewItemForm()">
                    Créer
                  </button>
                </form>
              }
            `,
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class SlugNameDtoPostComponent {

  private formBuilder = inject(FormBuilder);

  @Input() type! : string;
  @Output() newItemName: EventEmitter<SlugNameDto['name']> = new EventEmitter();

  isFormVisible : boolean = false;
  isFormSubmit : boolean = false;

  newItemForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  submitNewItemForm(): void{

    this.isFormSubmit = true
    
    if(this.newItemForm.valid){
      this.newItemName.emit(this.newItemForm.value.name!);
      this.isFormSubmit = false;
      this.newItemForm.reset()
    }
  }
}
