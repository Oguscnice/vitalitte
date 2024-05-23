import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlugNameDto } from '../../../interfaces/SlugNameDto';

@Component({
  standalone: true,
  imports: [ NgClass ],
  selector: 'app-slug-name-dto-edit-delete',
  template: ` <div class="title-functionality flex center">
                <h4 class="flex center">Gérer les {{ type }}</h4>
                <i class="fa-solid fa-arrow-down" (click)="isTableVisible = !isTableVisible" [ngClass]="{'rotated180': isTableVisible}"></i>
              </div>
              @if (items && isTableVisible) {
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
                    @for (item of items; track item; let index = $index) {
                      <tr [ngClass]="index % 2 ? 'bg-dark' : ''">
                        <td class="flex column">
                          @if (item.slug !== itemToEdit?.slug) {
                            <p>{{ item.name }}</p>
                          } @else {
                            <input type="text"
                                  value="{{ item.name }}"
                                  (keyup)="changeNameValue($event)"/>
                          }
                          @if (!itemToEdit?.name && itemToEdit?.slug === item.slug) {
                            <small>Le nom de categorie ne peut être vide</small>
                          }
                        </td>
                        <td>
                          @if (item.slug !== itemToEdit?.slug) {
                            <i (click)="canEdit(item)" class="fa-solid fa-pencil flex center"></i>
                          } @else {
                            <div class="flex center space-around" >
                              <i (click)="edit()" class="fa-solid fa-check-circle"></i>
                              <i (click)="itemToEdit = null" class="fa-solid fa-circle-xmark"></i>
                            </div>
                          }
                        </td>
                        <td>
                          <i (click)="itemToEdit?.slug !== item.slug ? delete(item) : ''"
                              class="fa-solid fa-trash-can flex center"
                              [ngClass]="itemToEdit?.slug === item.slug ? 'disabled' : '' "></i>
                        </td>
                      </tr>
                    }
                    </tbody>
                </table>
              } @else if (!items || items.length <= 0) {
                <h5>Aucun Article</h5>
              }
              `,
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class SlugNameDtoEditDeleteComponent {

  @Input() items! : SlugNameDto[];
  @Input() type! : string;
  @Output() itemEdited: EventEmitter<SlugNameDto> = new EventEmitter();
  @Output() itemToDelete: EventEmitter<SlugNameDto> = new EventEmitter();

  isTableVisible: boolean = true;

  itemToEdit : SlugNameDto | null = null;

  canEdit = (itemSelected: SlugNameDto) => this.itemToEdit = {...itemSelected}

  changeNameValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.itemToEdit!.name = inputElement.value;
  }

  edit = () => this.itemEdited.emit(this.itemToEdit!);
  delete = (item: SlugNameDto) => this.itemToDelete.emit(item);
}
