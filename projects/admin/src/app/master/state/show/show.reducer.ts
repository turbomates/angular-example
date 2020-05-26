import { createReducer, on } from "@ngrx/store";

import { loadMasterSuccess, reset } from "./show.actions";
import { Master } from "../../master.model";

export interface ShowState {
  masterData: Master | null;
}

export const showFeatureKey = "show";

export const showInitialState: ShowState = {
  masterData: null
};

export const showReducer = createReducer(
  showInitialState,

  // Load Player
  on(loadMasterSuccess, (state, { data }) => ({
    ...state,
    masterData: data
  })),

  // Clear state
  on(reset, () => showInitialState)
);
