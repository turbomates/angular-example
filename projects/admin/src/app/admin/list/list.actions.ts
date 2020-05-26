import { createAction, props } from "@ngrx/store";

import {
  PaginationSearchParams,
  ListResponse,
  Error
} from "src/app/common/models";

import { Admin } from "../admin.model";

// Change pagination
export const updateCurrentPage = createAction(
  "[Admins | List] Update page",
  props<{ currentPage: number }>()
);

export const updatePageSize = createAction(
  "[Admins | List] Update page size",
  props<{ pageSize: number }>()
);

// Load list
export const loadList = createAction(
  "[Admins | List] Load list",
  props<{ params: PaginationSearchParams }>()
);

export const loadListSuccess = createAction(
  "[Admins | List] List success",
  props<{ list: ListResponse<Admin> }>()
);

export const loadListFailed = createAction(
  "[Admins | List] List failed",
  props<{ error: Error }>()
);
