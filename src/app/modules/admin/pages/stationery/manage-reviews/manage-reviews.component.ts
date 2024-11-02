import {Component, inject, OnInit} from '@angular/core';
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {ReviewDto} from "../../../../../shared/interfaces/Review";
import {AdminReviewSignalService} from "../../../shared/services/admin-review-signal.service";
import {DatePipe, NgClass, SlicePipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {PaginationSignalService} from "../../../../../shared/services/pagination-signal.service";
import {
  ChangeSizePaginationAndValueSearchComponent
} from "../../../../../components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {
  ChangePageButtonsPagination
} from "../../../../../components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {ModalSignalService} from "../../../../../shared/services/modal-signal.service";

@Component({
  selector: 'app-manage-reviews',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
    ChangeSizePaginationAndValueSearchComponent,
    ChangePageButtonsPagination,
    DatePipe,
    UpperCasePipe,
    SlicePipe
  ],
  templateUrl: './manage-reviews.component.html',
  styles: [`
    @import "../../../../../scss/chips.scss";
    @import "../../../scss/admin-table.scss";
    @import "../../../scss/admin-toggle.scss";

    h1 {
      color: $lilac-dark
    }

    table {
      tbody {
        tr {
          div {
            div {
              .fa-circle-check {
                color: $green;
              }
              .fa-circle-xmark {
                color: $red;
              }
            }
          }
        }
      }
    }
  `]
})
export class ManageReviewsComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private adminReviewSignal = inject(AdminReviewSignalService);
  private modalSignal = inject(ModalSignalService);
  paginationSignal = inject(PaginationSignalService)

  reviews$ = this.dataSignal.$reviews
  reviewStatusList$ = this.adminReviewSignal.$reviewStatusList
  reviewStatusSelectedFilter: ReviewDto['status'] = "En attente de Validation";
  seeRating: boolean = false;

  ngOnInit(): void {
    this.paginationSignal.setReviewStatus(this.reviewStatusSelectedFilter);
    this.adminReviewSignal.getAllReviewStatus();
  }

  onReviewStatusClicked(status : ReviewDto['status']): void {
    this.reviewStatusSelectedFilter = status === this.reviewStatusSelectedFilter ? "" : status;
    this.paginationSignal.setReviewStatus(this.reviewStatusSelectedFilter ?? '');
    this.dataSignal.getAllReviewsByStatus();
  }

  onValuePageChange(event: string): void {
    this.dataSignal.getAllReviewsByStatus();
  }

  openModalWithReviewContent(reviewContent : ReviewDto['content']): void {
    this.modalSignal.showModal(reviewContent, false);
  }

  changeStatusReview(status: string, review: ReviewDto): void {
    if (!this.isChecked(status, review)) {
      review.status = status;
      this.adminReviewSignal.changeStatus(review);
    }
  }

  isChecked(status: string, review: ReviewDto): boolean {
    return review.status === status;
  }
}
