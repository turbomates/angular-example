import { createSelector } from "@ngrx/store";

import { showFeatureKey, ShowState } from "./show.reducer";
import { getMasterState, MasterState } from "../index";

export const getShowState = createSelector(
  getMasterState,
  (state: MasterState) => state[showFeatureKey]
);

export const getData = createSelector(
  getShowState,
  (state: ShowState) => state.masterData
);
