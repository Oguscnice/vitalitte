import {ProductCommonValuesDto} from "./Product";

export interface Page<T> {
  content: T[],
  pageable: Pageable,
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  first: number,
  numberOfElements: number,
  empty: boolean
}

export interface PageableValues {
  pageNumber: number,
  pageSize: number,
}

export interface Pageable {
  pageNumber: number,
  pageSize: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  offset: number,
  paged: boolean,
  unpaged: boolean
}

export const PageEmpty = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    offset: 0,
    paged: true,
    unpaged: false
  },
  last: true,
  totalElements: 0,
  totalPages: 0,
  size: 10,
  number: 0,
  first: 0,
  numberOfElements: 0,
  empty: true
}

export interface PaginationWithSearchValue {
  searchValue: string,
  pageableValues: PageableValues
}

export interface PaginationReviewsFiltered {
  status: string,
  productCommonValuesDto: ProductCommonValuesDto,
  rating: number
}
