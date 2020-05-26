import { createAction, props } from "@ngrx/store";

import {
  ListResponse,
  PaginationSearchParams,
  Error
} from "src/app/common/models";

import { SuperAgent } from "../../super-agent.models";

// Change pagination
export const updateCurrentPage = createAction(
  "[SuperAgent | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[SuperAgent | List] Update page size",
  props<{ pageSize: number }>()
);

// Load list
export const loadList = createAction(
  "[SuperAgent | List] Load list",
  props<{ params: PaginationSearchParams }>()
);

export const loadListSuccess = createAction(
  "[SuperAgent | List] List success",
  props<{ list: ListResponse<SuperAgent> }>()
);

export const loadListFailed = createAction(
  "[SuperAgent | List] List failed",
  props<{ error: Error }>()
);
