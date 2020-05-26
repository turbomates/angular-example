import { createFeatureSelector, createSelector } from "@ngrx/store";

import { showFeatureKey } from "./show.reducer";
import { ShowState } from "../show.model";

const getShowState = createFeatureSelector(showFeatureKey);

export const getPlayer = createSelector(
  getShowState,
  (state: ShowState) => state.playerData
);
