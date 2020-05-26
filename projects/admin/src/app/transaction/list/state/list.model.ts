import { Money, Error } from "src/app/common/models";

export interface Transaction {
  actionType: string;
  createdAt: string;
  id: string;
  money: Money;
  status: string;
  type: string;
  updatedAt: string;
}

export interface ListState {
  list: Transaction[];
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  error: Error | null;
}
