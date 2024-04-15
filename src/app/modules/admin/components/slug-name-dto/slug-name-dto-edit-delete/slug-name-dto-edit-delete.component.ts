import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlugNameDto } from '../../../interfaces/SlugNameDto';

@Component({
  selector: 'app-slug-name-dto-edit-delete',
  standalone: true,
  imports: [ NgIf, NgClass, NgFor ],
  template: ` <div class="title-functionality flex center">
                <h4 class="flex center">Gérer les {{ type }}</h4>
                <i class="fa-solid fa-arrow-down" (click)="isTableVisible = !isTableVisible" [ngClass]="{'rotated180': isTableVisible}"></i>
              </div>

              <div *ngIf="!items || items.length <= 0">Aucun Article</div>

              <table *ngIf="items && isTableVisible">
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
                  <tr *ngFor="let item of items ; let index = index"
                      [ngClass]="index % 2 ? 'bg-dark' : ''">
                <td class="flex column">
                  <p *ngIf="item.slug !== itemToEdit?.slug">{{ item.name }}</p>
                  <input *ngIf="item.slug === itemToEdit?.slug"
                        type="text"
                        value="{{ item.name }}"
                        (keyup)="changeNameValue($event)"/>
                  <small *ngIf="!itemToEdit?.name && itemToEdit?.slug === item.slug">Le nom de categorie ne peut être vide</small>
                  </td>
                  <td>
                    <i *ngIf="item.slug !== itemToEdit?.slug"
                      (click)="canEdit(item)"
                      class="fa-solid fa-pencil flex center"></i>
                    <div class="flex center space-around" >
                    <i *ngIf="item.slug === itemToEdit?.slug"
                      (click)="edit()"
                      class="fa-solid fa-check-circle"></i>
                    <i *ngIf="item.slug === itemToEdit?.slug"
                      (click)="itemToEdit = null"
                      class="fa-solid fa-circle-xmark"></i>
                    </div>
                  </td>
                  <td>
                    <i (click)="itemToEdit?.slug !== item.slug ? delete(item) : ''"
                      class="fa-solid fa-trash-can flex center"
                      [ngClass]="itemToEdit?.slug === item.slug ? 'disabled' : '' "></i>
                  </td>
                </tbody>
              </table>
              `,
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class SlugNameDtoEditDeleteComponent {

  @Input() items! : SlugNameDto[];
  @Input() type! : string;
  @Output() itemEdited: EventEmitter<SlugNameDto> = new EventEmitter();
  @Output() itemToDelete: EventEmitter<SlugNameDto> = new EventEmitter();

  isTableVisible: boolean = false;

  itemToEdit : SlugNameDto | null = null;

  canEdit = (itemSelected: SlugNameDto) => this.itemToEdit = {...itemSelected}

  changeNameValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.itemToEdit!.name = inputElement.value;
  }

  edit = () => this.itemEdited.emit(this.itemToEdit!);
  delete = (item: SlugNameDto) => this.itemToDelete.emit(item);
}
