import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/shared/interfaces/Category';

@Component({
  selector: 'app-post-category',
  template: ` <div class="title-functionality flex center">
                <h4>Créer une nouvelle Catégorie</h4>
                <i class="fa-solid fa-circle-plus"
                  (click)="isFormVisible = !isFormVisible"
                  [ngClass]="{'rotated45': isFormVisible}"></i>
              </div>

              <form
                *ngIf="isFormVisible"
                (ngSubmit)="(newCategoryForm.valid)"
                [formGroup]="newCategoryForm"
                #myForm="ngForm"
              >
                <fieldset class="flex column">
                  <label for="name">Nom :</label>
                  <input type="text"
                         id="name"
                         placeholder="Nom..."
                         formControlName="name"
                         autocomplete="off"/>

                  <div *ngIf="isFormSubmit && myForm.submitted && newCategoryForm.controls['name'].invalid">
                    <small *ngIf="newCategoryForm.controls.name.errors?.['required']">Le nom de la catégorie est obligatoire.</small>
                    <small *ngIf="newCategoryForm.controls.name.errors?.['maxlength']">Le nom de la catégorie ne doit pas dépasser 255 charactères.</small>
                  </div>
                </fieldset>
                
                <button class="btn-submit-admin"
                        type="submit"
                        (click)="submitNewCategoryForm()">
                  Créer
                </button>
              </form>`,
  styles: [`
            @import "../../../scss/admin-general.scss";
          `]
})
export class PostCategoryComponent {
  constructor(
    private formBuilder: FormBuilder
  ){}

  @Input() materialTypes! : string[];
  @Output() newCategoryName: EventEmitter<CategoryDto['name']> = new EventEmitter();

  isFormVisible : boolean = false;
  isFormSubmit : boolean = false;

  newCategoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  submitNewCategoryForm(): void{

    this.isFormSubmit = true
    
    if(this.newCategoryForm.valid){
      this.newCategoryName.emit(this.newCategoryForm.value.name!);
      this.isFormSubmit = false;
      this.newCategoryForm.reset()
    }
  }
}
