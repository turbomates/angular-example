import { createSelector } from "@ngrx/store";

import { PaginationSearchParams } from "src/app/common/models";

import { getMasterState, MasterState } from "..";
import { listFeatureKey, ListState } from "./list.reducer";

export const getListState = createSelector(
  getMasterState,
  (state: MasterState) => state[listFeatureKey]
);

export const getData = createSelector(
  getListState,
  (state: ListState) => state.data
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

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.isLoading
);
