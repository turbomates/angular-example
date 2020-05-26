import { createReducer, on, Action } from "@ngrx/store";

import { ShowState } from "../show.model";
import {loadPlayerSuccess, reset} from "./show.actions";

export const showFeatureKey = "showPlayer";

export const initialState: ShowState = {
  playerData: null
};

const reducer = createReducer(
  initialState,

  // Load Player
  on(loadPlayerSuccess, (state, { data }) => ({
    ...state,
    playerData: data
  })),

  // Clear state
  on(reset, () => initialState)
);

export function showReducer(state: ShowState, action: Action) {
  return reducer(state, action);
}
