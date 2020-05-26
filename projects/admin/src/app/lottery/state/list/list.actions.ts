import { createAction, props } from "@ngrx/store";

import { ListResponse, Error } from "src/app/common/models";

import { Lottery, SearchParams } from "../../lottery.model";

// Change pagination
export const updateCurrentPage = createAction(
  "[Lottery | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[Lottery | List] Update page size",
  props<{ pageSize: number }>()
);

// Change scope
export const updateScope = createAction(
  "[Lottery | List] Select scope",
  props<{ scopeType: string | null }>()
);

// Load
export const loadList = createAction(
  "[Lottery | List] Load list",
  props<{ params: SearchParams }>()
);

export const loadListSuccess = createAction(
  "[Lottery | List] Load list success",
  props<{ data: ListResponse<Lottery>; params: SearchParams }>()
);

export const loadListFailed = createAction(
  "[Lottery | List] Load list failed",
  props<{ error: Error }>()
);
