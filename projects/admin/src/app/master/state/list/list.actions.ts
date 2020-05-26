import { createAction, props } from "@ngrx/store";

import {
  ListResponse,
  PaginationSearchParams,
  Error
} from "src/app/common/models";

import { Master } from "../../master.model";

// Change pagination
export const updateCurrentPage = createAction(
  "[Master | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[Master | List] Update page size",
  props<{ pageSize: number }>()
);

// Load
export const loadList = createAction(
  "[Master | List] Load list",
  props<{ params: PaginationSearchParams }>()
);

export const loadListSuccess = createAction(
  "[Master | List] Load list success",
  props<{ data: ListResponse<Master> }>()
);

export const loadListFailed = createAction(
  "[Master | List] Load list failed",
  props<{ error: Error }>()
);
