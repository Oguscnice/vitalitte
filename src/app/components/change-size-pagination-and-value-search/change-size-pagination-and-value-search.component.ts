import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {PaginationSignalService} from "../../shared/services/pagination-signal.service";

@Component({
  selector: 'app-change-size-pagination-and-value-search',
  standalone: true,
  imports: [ NgClass ],
  template: `
    <div class="inputs flex space-around">
      @if (!isInputSearchHidden) {
        <div class="input-search flex center">
          <p>Recherchez : </p>
          <input type="text" (keyup)="filteredByValueSearch($event)">
        </div>
      }
      @if (counterItem$() > 10) {
        <div class="input-size flex center" [ngClass]="{'one-input': isInputSearchHidden}">
          <p class="flex center">Nombre d'éléments par page :</p>
          <div class="dropdown-container">
            <div class="input-and-arrow flex">
              <input type="text"
                     autocomplete="off"
                     [value]="pageSize$()"
                     (click)="toggleSizeDropdown()"
                     readonly/>
              <div class="arrow-icon flex center">
                @if (isSizeDropdownOpen) {
                  <i class="fa-solid fa-circle-chevron-down pointer" (click)="toggleSizeDropdown()"></i>
                } @else {
                  <i class="fa-solid fa-circle-chevron-up pointer" (click)="toggleSizeDropdown()"></i>
                }
              </div>
            </div>
            <ul class="items-list" [ngClass]="{'dropdown-visible': isSizeDropdownOpen}">
              @for (number of [10,20,50]; track $index) {
                <li (click)="this.onChangePageSize(number); toggleSizeDropdown() "> {{ number }} </li>
              }
            </ul>
          </div>
        </div>
      }

    </div>
    @if (counterItem$() && counterItem$() > 1 ) {
      <small class="width100 flex center"> {{ counterItem$() }} éléments au total. </small>
    } @else if (counterItem$() && counterItem$() === 1 ) {
      <small class="width100 flex center"> {{ counterItem$() }} élément au total. </small>
    } @else {
      <small class="width100 flex center"> Aucun élément dans nos données. </small>
    }
  `,
  styles: [`
    @import "src/app/scss/variables.scss";

    .inputs {
      margin-top : $half-margin;
      width: 100%;

      .one-input {
        width: 100%;
      }
    }

    .dropdown-container {
      width: 80px;
      .input-and-arrow {
        width: 80px;
      }
      .items-list {
        width: 80px;
      }
    }
  `]
})
export class ChangeSizePaginationAndValueSearchComponent{

  private paginationSignal: PaginationSignalService = inject(PaginationSignalService);
  pageSize$ = this.paginationSignal.$pageSize;
  counterItem$ = this.paginationSignal.$counterItem;
  isSizeDropdownOpen: boolean = false;

  @Input() isInputSearchHidden: boolean = false;
  @Output() onValueSearchChange: EventEmitter<string> = new EventEmitter();

  toggleSizeDropdown(): void {
    this.isSizeDropdownOpen = !this.isSizeDropdownOpen;
  }

  filteredByValueSearch(event: KeyboardEvent): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.paginationSignal.setSearchValue(VALUE);
    this.onValueSearchChange.emit(VALUE);
  }

  onChangePageSize(value: number): void {
    this.paginationSignal.setPageSize(value);
    this.onValueSearchChange.emit("newPageSize" + value);
  }
}
