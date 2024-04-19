import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlugNameDto } from '../../../interfaces/SlugNameDto';

@Component({
  selector: 'app-slug-name-dto-post',
  standalone: true,
  imports: [ NgFor, NgIf, NgClass, ReactiveFormsModule ],
  template: ` <div class="title-functionality flex center">
                <h4>Créer une {{ type }}:</h4>
                <i class="fa-solid fa-circle-plus"
                  (click)="isFormVisible = !isFormVisible"
                  [ngClass]="{'rotated45': isFormVisible}"></i>
              </div>

              <form *ngIf="isFormVisible"
                    (ngSubmit)="(newItemForm.valid)"
                    [formGroup]="newItemForm"
                    #myForm="ngForm">
                <fieldset class="flex column">
                  <label for="name">Nom :</label>
                  <input type="text"
                         id="name"
                         placeholder="Nom..."
                         formControlName="name"
                         autocomplete="off"/>

                  <div *ngIf="isFormSubmit && myForm.submitted && newItemForm.controls['name'].invalid">
                    <small *ngIf="newItemForm.controls.name.errors?.['required']">Le nom de la catégorie est obligatoire.</small>
                    <small *ngIf="newItemForm.controls.name.errors?.['maxlength']">Le nom de la catégorie ne doit pas dépasser 255 charactères.</small>
                  </div>
                </fieldset>
                
                <button class="btn-submit-admin"
                        type="submit"
                        (click)="submitNewItemForm()">
                  Créer
                </button>
              </form>`,
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
