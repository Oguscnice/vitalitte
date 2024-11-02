import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnguilleComponent } from 'src/app/components/anguille/anguille.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BaseComponent } from 'src/app/base.component';
import { AdminCollectionSignalService } from '../../../shared/services/admin-collection-signal.service';

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, AnguilleComponent, ModalComponent ],
  selector: 'app-slug-name-dto-post',
  template: `
              <div class="title-functionality flex center">
                <h4>Créer une {{ type }} :</h4>
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
                          <small>Le nom de {{ type }} est obligatoire.</small>
                        }
                        @if (newItemForm.controls.name.errors?.['maxlength']) {
                          <small>Le nom de {{ type }} ne doit pas dépasser 255 charactères.</small>
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
  styles: [`
    @import "../../../scss/admin-general.scss";

    input {
      max-width: 320px;
    }
  `]
})
export class SlugNameDtoPostComponent extends BaseComponent {

  private formBuilder = inject(FormBuilder);
  private adminCollectionSignal = inject(AdminCollectionSignalService);

  @Input( { required : true }) type! : 'Catégorie' | 'Collection';

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  newItemForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  submitNewItemForm(): void {
    this.isFormSubmit = true
    if (this.newItemForm.valid) {
      if (this.type === 'Collection') {
        this.adminCollectionSignal.postCollection(this.newItemForm.value.name!)
      }
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.newItemForm.reset();
  }
}
