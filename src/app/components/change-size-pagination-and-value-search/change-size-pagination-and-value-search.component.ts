import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import {PaginationSignalService} from "../../shared/services/pagination-signal.service";

@Component({
  selector: 'app-change-size-pagination-and-value-search',
  standalone: true,
  imports: [ NgClass ],
  template: `
    <div class="flex space-around">
      <div class="input-search flex center" [ngClass]="{'display-none' : isInputSearchHidden}">
        <p>Recherchez : </p>
        <input type="text" (keyup)="filteredByValueSearch($event)">
      </div>
      <div class="flex center">
        <p>Nombre d'éléments par page :</p>
        <div class="dropdown-container">
          <input
            type="text"
            autocomplete="off"
            [value]="pageSize$()"
            (click)="toggleSizeDropdown()"
            readonly
          />
          <ul class="items-list" [ngClass]="{'dropdown-visible': isSizeDropdownOpen}">
            @for (number of [10,20,50]; track $index) {
              <li (click)="this.onChangePageSize(number); toggleSizeDropdown() "> {{ number }} </li>
            }
          </ul>
        </div>
      </div>
    </div>
    @if (counterItem$() && counterItem$() > 1 ) {
      <p> {{ counterItem$() }} éléments au total. </p>
    } @else if (counterItem$() && counterItem$() === 1 ) {
      <p> {{ counterItem$() }} élément au total. </p>
    } @else {
      <p> Aucun élément dans la base de données. </p>
    }
  `,
  styles: [`

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
