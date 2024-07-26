import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {PaginationSignalService} from "../../shared/services/pagination-signal.service";

@Component({
  selector: 'app-change-page-buttons-pagination',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  template: `
              @if (lastPageNumber$() > 1) {
                <div class="btns-change-page flex center space-around">
                  <i
                    class="btn pointer fa-solid fa-backward-fast flex center"
                    [ngClass]="{'disabled': pageNumber$() === 0 }"
                    (click)="this.onChangePage('first')">
                  </i>

                  <i
                    class="btn pointer fa-solid fa-chevron-left flex center"
                    [ngClass]="{'disabled': pageNumber$() === 0 }"
                    (click)="this.onChangePage('prev')">
                  </i>

                  <p class="line-nowrap">Page {{ pageNumber$() + 1 }} / {{ lastPageNumber$() }}</p>

                  <i
                    class="btn pointer fa-solid fa-chevron-right flex center"
                    [ngClass]="{'disabled': pageNumber$() + 1 === lastPageNumber$() }"
                    (click)="this.onChangePage('next')">
                  </i>

                  <i
                    class="btn pointer fa-solid fa-forward-fast flex center"
                    [ngClass]="{'disabled': pageNumber$() + 1 === lastPageNumber$() }"
                    (click)="this.onChangePage('last')">
                  </i>
                </div>
              }

            `,
  styles: [`
    @import "../../scss/variables.scss";

    .btns-change-page {
      margin: $double-margin auto;
      max-width: 400px;

      p {
        font-size: $triple-font-size;
      }
    }
  `]
})
export class ChangePageButtonsPagination {

  private paginationSignal = inject(PaginationSignalService);
  pageNumber$ = this.paginationSignal.$pageNumber;
  lastPageNumber$ = this.paginationSignal.$lastPage;

  @Output() onPageChange: EventEmitter<string> = new EventEmitter();

  onChangePage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    this.paginationSignal.changeCurrentPage(choice);
    this.onPageChange.emit(choice);
  }
}
