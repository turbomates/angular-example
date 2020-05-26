import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ShowState } from "../show.model";
import { showFeatureKey } from "./show.reducer";

export const getShowState = createFeatureSelector<ShowState>(showFeatureKey);

export const getData = createSelector(
  getShowState,
  (state: ShowState) => state.data
);
