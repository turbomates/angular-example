import { createSelector } from "@ngrx/store";

import { listFeatureKey, ListState } from "./list.reducer";
import { getLotteryState, LotteryState } from "../index";
import { SearchParams } from "../../lottery.model";

export const getListState = createSelector(
  getLotteryState,
  (state: LotteryState) => state[listFeatureKey]
);

export const getData = createSelector(
  getListState,
  (state: ListState) => state.data
);

export const getError = createSelector(
  getListState,
  (state: ListState) => state.error
);

export const getSearchParams = createSelector(
  getListState,
  (state: ListState) =>
    ({
      currentPage: state.currentPage,
      pageSize: state.pageSize,
      type: state.type
    } as SearchParams)
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
