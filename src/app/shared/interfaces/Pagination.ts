export interface Pagination {
  page: number;
  size: number;
}

export interface PaginationWithSearchValue {
  searchValue: string,
  pagination: Pagination
}
