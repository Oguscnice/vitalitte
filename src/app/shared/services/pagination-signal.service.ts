import {Injectable, Signal, signal} from '@angular/core';
import {PaginationSignalState} from "../interfaces/PaginationSignalState";
import {Pagination, PaginationWithSearchValue} from "../interfaces/Pagination";

@Injectable({
  providedIn: 'root'
})
export class PaginationSignalService {

  private readonly state: PaginationSignalState = {
    $privateSearchValue: signal<string>(""),
    $privatePageSizeValue: signal<number>(10),
    $privateCurrentPageNumber: signal<number>(0),
    $privateCounterItems: signal<number>(0),
    $privateLastPage: signal<number>(0),
  } as const;

  public readonly $searchValue: Signal<string> = this.state.$privateSearchValue.asReadonly();
  public readonly $pageSize: Signal<number> = this.state.$privatePageSizeValue.asReadonly();
  public readonly $currentPageNumber: Signal<number> = this.state.$privateCurrentPageNumber.asReadonly();
  public readonly $counterItem: Signal<number> = this.state.$privateCounterItems.asReadonly();
  public readonly $lastPage: Signal<number> = this.state.$privateLastPage.asReadonly();

  setSearchValue(value: string): void {
    this.state.$privateSearchValue.set(value);
    this.calcLastPage();
    this.changeCurrentPage('first');
  }

  setPageSize(value: number): void {
    this.state.$privatePageSizeValue.set(value);
    this.calcLastPage();
    this.changeCurrentPage('first');
  }

  setCurrentPageNumber(value: number): void {
    this.state.$privateCurrentPageNumber.set(value);
  }

  setCounterItem(value: number): void {
    this.state.$privateCounterItems.set(value);
    this.calcLastPage();
  }

  setLastPage(value: number): void {
    this.state.$privateLastPage.set(value);
  }

  changeCurrentPage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    const CURRENT_PAGE = this.state.$privateCurrentPageNumber();
    if (choice === 'first') {
      this.setCurrentPageNumber(0);
    } else if (choice === 'last') {
      this.setCurrentPageNumber(this.state.$privateLastPage() - 1);
    } else if (choice === 'prev') {
      this.setCurrentPageNumber(CURRENT_PAGE - (CURRENT_PAGE < 1 ? 0 : 1));
    } else if (choice === 'next') {
      this.setCurrentPageNumber(CURRENT_PAGE + (CURRENT_PAGE < (this.state.$privateLastPage() - 1) ? 1 : 0));
    }
  }

  calcLastPage(): void {
    const COUNTER_ITEM = this.state.$privateCounterItems();
    const PAGE_SIZE = this.state.$privatePageSizeValue();
    const LAST_PAGE = Math.floor(COUNTER_ITEM / PAGE_SIZE) + (COUNTER_ITEM % PAGE_SIZE === 0 ? 0 : 1);
    this.setLastPage(LAST_PAGE);
  }

  transformToPagination(): Pagination {
    return {
      page: this.state.$privateCurrentPageNumber(),
      size: this.state.$privatePageSizeValue()
    }
  }

  transformToPaginationWithSearchValue(): PaginationWithSearchValue {
    return {
      searchValue : this.state.$privateSearchValue(),
      pagination : this.transformToPagination()
    }
  }
}
