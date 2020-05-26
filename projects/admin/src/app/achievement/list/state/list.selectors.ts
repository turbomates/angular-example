import { createFeatureSelector, createSelector } from "@ngrx/store";

import { listFeatureKey } from "./list.reducer";
import { ListState } from "../list.models";

export const getListState = createFeatureSelector<ListState>(listFeatureKey);

export const getList = createSelector(
  getListState,
  (state: ListState) => state.list
);
