import { NgClass } from '@angular/common';
import {Component, Input, Signal, inject, OnInit} from '@angular/core';
import { SlugNameDto } from '../../../shared/interfaces/SlugNameDto';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { AdminCollectionSignalService } from '../../../shared/services/admin-collection-signal.service';
import { AdminCategorySignalService } from '../../../shared/services/admin-category-signal.service';
import { DataSignalService } from 'src/app/shared/services/data-signal.service';
import {FormHelperService} from "../../../shared/services/form-helper.service";

@Component({
  standalone: true,
  imports: [ NgClass, ModalComponent ],
  selector: 'app-slug-name-dto-edit-delete',
  template: ` <div class="title-functionality flex center">
                <h4 class="flex center">Gérer les {{ type }}</h4>
                <i class="fa-solid fa-arrow-down" (click)="isTableVisible = !isTableVisible" [ngClass]="{'rotated180': isTableVisible}"></i>
              </div>
              @if (isTableVisible) {
                <table>
                  <thead>
                    <tr>
                      <td>
                        <p>Nom</p>
                      </td>
                      <td>
                        <p>Modif.</p>
                      </td>
                      <td>
                        <p>Supp.</p>
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    @for (item of items(); track item; let index = $index) {
                      <tr [ngClass]="index % 2 ? 'bg-dark' : ''">
                        <td class="flex column">
                          @if (!isEditing(item)) {
                            <p>{{ item.name }}</p>
                          } @else {
                            <div class="flex column">
                              <input type="text"
                                     value="{{ item.name }}"
                                     (keyup)="changeNameValue($event)"
                                     placeholder="Le nom est obligatoire"
                                     [ngClass]="{'input-invalid' : itemForm.controls['name'].invalid }"/>

                              @if (isFormSubmit && itemForm.controls['name'].invalid) {
                                <div>
                                  @if (itemForm.controls.name.errors?.['maxlength']) {
                                    <small [style.color]="'red'">Le nom ne peut pas dépasser 255 caractères</small>
                                  }
                                </div>
                              }
                            </div>
                          }
                        </td>
                        <td>
                          @if (!isEditing(item)) {
                            <i (click)="canEdit(item)" class="fa-solid fa-pencil flex center"></i>
                          } @else {
                            <div class="flex center space-around" >
                              <i (click)="edit()" class="fa-solid fa-check-circle"></i>
                              <i (click)="itemForm.reset()" class="fa-solid fa-circle-xmark"></i>
                            </div>
                          }
                        </td>
                        <td>
                          <i (click)="!isEditing(item) ? this.delete(item) : ''"
                              class="fa-solid fa-trash-can flex center"
                              [ngClass]="{'disabled' : isEditing(item)}"></i>
                        </td>
                      </tr>
                    }
                    </tbody>
                </table>
              }
              `,
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class SlugNameDtoEditDeleteComponent implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private formHelper: FormHelperService = inject(FormHelperService);
  private dataSignal: DataSignalService = inject(DataSignalService);
  private adminCollectionSignal: AdminCollectionSignalService = inject(AdminCollectionSignalService);
  private adminCategorySignal: AdminCategorySignalService = inject(AdminCategorySignalService);

  @Input() type! : 'Catégories' | 'Collections';

  items!: Signal<CategoryDto[]> | Signal<CollectionDto[]>;

  isTableVisible: boolean = true;
  isFormSubmit: boolean = false;

  itemForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.type === 'Catégories') {
      this.dataSignal.getAllCategories();
      this.items = this.dataSignal.$categories;
    } else if (this.type === 'Collections') {
      this.dataSignal.getAllCollections();
      this.items = this.dataSignal.$collections;
    }
  }

  canEdit(itemSelected: SlugNameDto): void {
    this.itemForm.get('name')!.setValue(itemSelected.name)
    this.itemForm.get('slug')!.setValue(itemSelected.slug)
  }

  isEditing(item: SlugNameDto): boolean {
    return item.slug === this.itemForm.get('slug')!.value;
  }

  changeNameValue(event: KeyboardEvent): void {
    const INPUT_ELEMENT: HTMLInputElement = event.target as HTMLInputElement;
    this.itemForm.get('name')!.setValue(INPUT_ELEMENT.value);
  }

  edit(): void {

    this.isFormSubmit = true;

    if (this.itemForm.valid) {
      if (this.type === 'Catégories') {
        this.adminCategorySignal.putCategory(this.formHelper.formatFormToDto<CategoryDto>(this.itemForm));
      } else if (this.type === 'Collections') {
        this.adminCollectionSignal.putCollection(this.formHelper.formatFormToDto<CollectionDto>(this.itemForm));
      }
      this.itemForm.reset();
      this.isFormSubmit = false;
    }
  }

  delete(item: SlugNameDto): void {
    if (this.type === 'Catégories') {
      this.adminCategorySignal.confirmationModalForDeleteCategory(item);
    } else if (this.type === 'Collections') {
      this.adminCollectionSignal.confirmationModalForDeleteCollection(item);
    }
  }
}
