import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {PaginationSignalState} from "../interfaces/PaginationSignalState";
import {Page, PageableValues, PaginationReviewsFiltered, PaginationWithSearchValue} from "../interfaces/Page";
import {ProductCommonValuesDto} from "../interfaces/Product";

@Injectable({
  providedIn: 'root'
})
export class PaginationSignalService {

  private readonly state: PaginationSignalState = {
    $privateSearchValue: signal<string>(""),
    $privatePageSize: signal<number>(10),
    $privatePageNumber: signal<number>(0),
    $privateCounterItems: signal<number>(0),
    $privateLastPage: signal<number>(0),
    $privateReviewStatus: signal<string>(""),
    $privateReviewRating: signal<number>(0),
    $privateReviewProductCommonValuesDto: signal<ProductCommonValuesDto | null>(null),
  } as const;

  public readonly $pageSize: Signal<number> = this.state.$privatePageSize.asReadonly();
  public readonly $pageNumber: Signal<number> = this.state.$privatePageNumber.asReadonly();
  public readonly $counterItem: Signal<number> = this.state.$privateCounterItems.asReadonly();
  public readonly $lastPage: Signal<number> = this.state.$privateLastPage.asReadonly();
  public readonly $reviewStatus: Signal<string> = this.state.$privateReviewStatus.asReadonly();
  public readonly $reviewRating: Signal<number> = this.state.$privateReviewRating.asReadonly();
  public readonly $reviewProductCommonValuesDto: Signal<ProductCommonValuesDto | null> = this.state.$privateReviewProductCommonValuesDto.asReadonly();


  private setCounterItem(value: number): void {
    this.state.$privateCounterItems.set(value);
  }

  private setLastPage(value: number): void {
    this.state.$privateLastPage.set(value);
  }

  private setCurrentPageNumber(value: number): void {
    this.state.$privatePageNumber.set(value);
  }

  setSearchValue(value: string): void {
    this.state.$privateSearchValue.set(value);
    this.setCurrentPageNumber(0);
  }

  setPageSize(value: number): void {
    this.state.$privatePageSize.set(value);
    this.setCurrentPageNumber(0);
  }

  setPageInfo(page: Page<any>): void {
    this.setCounterItem(page.totalElements);
    this.setPageSize(page.pageable.pageSize);
    this.setLastPage(page.totalPages);
    this.setCurrentPageNumber(page.pageable.pageNumber);
  }

  changeCurrentPage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    const CURRENT_PAGE = this.state.$privatePageNumber();
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

  transformToPageableValues(): PageableValues {
    return {
      pageNumber: this.state.$privatePageNumber(),
      pageSize: this.state.$privatePageSize(),
    }
  }

  transformToPaginationWithSearchValue(): PaginationWithSearchValue {
    return {
      searchValue : this.state.$privateSearchValue(),
      pageableValues : this.transformToPageableValues()
    }
  }

  //-------------------
  //------REVIEWS------
  //-------------------

  setReviewStatus(status: string): void {
    this.state.$privateReviewStatus.set(status);
  }

  setReviewRating(rating: number): void {
    this.state.$privateReviewRating.set(rating);
  }

  setReviewProductCommonValuesDto(productCommonValuesDto: ProductCommonValuesDto | null): void {
    this.state.$privateReviewProductCommonValuesDto.set(productCommonValuesDto);
  }

  transformToPaginationReviewsFiltered(): PaginationReviewsFiltered {
    return {
      ...this.transformToPaginationWithSearchValue(),
      status: this.$reviewStatus(),
      productCommonValuesDto: this.$reviewProductCommonValuesDto()!,
      rating: this.$reviewRating()
    }
  }
}
