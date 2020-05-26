import { createAction, props } from "@ngrx/store";

import {
  ListResponse,
  PaginationSearchParams,
  Error
} from "src/app/common/models";

import { Player } from "../../player.model";

// Change pagination
export const updateCurrentPage = createAction(
  "[Player | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[Player | List] Update page size",
  props<{ pageSize: number }>()
);

// Load list
export const loadList = createAction(
  "[Player | List] Load list",
  props<{ params: PaginationSearchParams }>()
);

export const loadListSuccess = createAction(
  "[Player | List] List success",
  props<{ list: ListResponse<Player> }>()
);

export const loadListFailed = createAction(
  "[Player | List] List failed",
  props<{ error: Error }>()
);
