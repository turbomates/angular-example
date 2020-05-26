export interface ListResponse<T> {
  data: T[];
  currentPage: number;
  hasMore: boolean;
  pageSize: number;
}

export interface ShowResponse<T> {
  data: T;
}

export interface Choice {
  value: string;
  label: string;
}

export interface PaginationSearchParams {
  currentPage: number;
  pageSize: number;
}

export interface Money {
  amount: number;
  currency: string;
}
