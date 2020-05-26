import { createReducer, on, Action } from "@ngrx/store";

import { loadAchievementSuccess, reset } from "./show.actions";
import { ShowState } from "../show.model";

export const showFeatureKey = "showAchievement";

export const initialState: ShowState = {
  achievement: null
};

const reducer = createReducer(
  initialState,

  on(loadAchievementSuccess, (state, { data }) => ({
    ...state,
    achievement: data
  })),
  // clear state
  on(reset, () => initialState)
);

export function showReducer(state: ShowState, action: Action) {
  return reducer(state, action);
}
