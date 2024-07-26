import {WritableSignal} from "@angular/core";
import {ProductCommonValuesDto} from "./Product";

export interface PaginationSignalState {
  $privateSearchValue: WritableSignal<string>;
  $privatePageSize: WritableSignal<number>;
  $privatePageNumber: WritableSignal<number>;
  $privateCounterItems: WritableSignal<number>;
  $privateLastPage: WritableSignal<number>;
  $privateReviewStatus: WritableSignal<string>;
  $privateReviewRating: WritableSignal<number>;
  $privateReviewProductCommonValuesDto: WritableSignal<ProductCommonValuesDto | null>;
}
