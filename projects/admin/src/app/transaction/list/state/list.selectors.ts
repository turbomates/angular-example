import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PaginationSearchParams } from "src/app/common/models";

import { ListState } from "./list.model";
import { listFeatureKey } from "./list.reducer";

export const getListState = createFeatureSelector<ListState>(listFeatureKey);

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
);

export const getList = createSelector(
  getListState,
  (state: ListState) => state.list
);

export const getError = createSelector(
  getListState,
  (state: ListState) => state.error
);

export const getPaginationSearchParams = createSelector(
  getListState,
  (state: ListState) =>
    ({
      currentPage: state.currentPage,
      pageSize: state.pageSize
    } as PaginationSearchParams)
);

export const getCurrentTotal = createSelector(
  getListState,
  (state: ListState) =>
    (state.currentPage + (state.hasMore ? 1 : 0)) * state.pageSize
);
