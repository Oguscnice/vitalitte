import {WritableSignal} from "@angular/core";

export interface PaginationSignalState {
  $privateSearchValue: WritableSignal<string>;
  $privatePageSizeValue: WritableSignal<number>;
  $privateCurrentPageNumber: WritableSignal<number>;
  $privateCounterItems: WritableSignal<number>;
  $privateLastPage: WritableSignal<number>;
}
