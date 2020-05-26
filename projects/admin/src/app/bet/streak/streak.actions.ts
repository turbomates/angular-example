import { createAction, props } from "@ngrx/store";

import {
  ListResponse,
  PaginationSearchParams,
  Error
} from "src/app/common/models";

import { StreakBet } from "./streak.model";

// Change pagination
export const updateCurrentPage = createAction(
  "[StreakBetList | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[StreakBetList | List] Update page size",
  props<{ pageSize: number }>()
);

// Load list
export const loadList = createAction(
  "[StreakBetList | List] Load list",
  props<{ params: PaginationSearchParams }>()
);

export const loadListSuccess = createAction(
  "[StreakBetList | List] List success",
  props<{ list: ListResponse<StreakBet> }>()
);

export const loadListFailed = createAction(
  "[StreakBetList | List] List failed",
  props<{ error: Error }>()
);
