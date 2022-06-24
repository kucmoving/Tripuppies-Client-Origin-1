export interface Pagination{
  currentPage: number;
  intemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T>{
  result: T;
  pagination: Pagination;
}
