import { createAction, props } from "@ngrx/store";

import {
  PaginationSearchParams,
  ListResponse,
  Error
} from "src/app/common/models";

import { Transaction } from "./list.model";

// Change pagination
export const updateCurrentPage = createAction(
  "[Transaction | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[Transaction | List] Update page size",
  props<{ pageSize: number }>()
);

// Load list
export const loadList = createAction(
  "[Transaction | List] Load list",
  props<{ params: PaginationSearchParams }>()
);

export const loadListSuccess = createAction(
  "[Transaction | List] List success",
  props<{ list: ListResponse<Transaction> }>()
);

export const loadListFailed = createAction(
  "[Transaction | List] List failed",
  props<{ error: Error }>()
);
