import {WritableSignal} from "@angular/core";
import {ProductDto} from "./Product";
import {CategoryDtoAndCollectionDto} from "./CategoryDtoAndCollectionDto";

export interface PaginationSignalState {
  $privateSearchValue: WritableSignal<string>;
  $privatePageSize: WritableSignal<number>;
  $privatePageNumber: WritableSignal<number>;
  $privateCounterItems: WritableSignal<number>;
  $privateLastPage: WritableSignal<number>;
  $privateReviewStatus: WritableSignal<string>;
  $privateReviewRating: WritableSignal<number>;
  $privateReviewProductDto: WritableSignal<ProductDto | null>;
  $privateCategoryDtoAndCollectionDto: WritableSignal<CategoryDtoAndCollectionDto>;
  $privateProductType: WritableSignal<string>;
}
