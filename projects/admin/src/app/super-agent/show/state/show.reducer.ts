import { createReducer, on, Action } from "@ngrx/store";

import { ShowState } from "../show.model";
import { loadSuperAgentSuccess } from "./show.actions";

export const showFeatureKey = "showAdminForm";

export const initialState: ShowState = {
  data: null
};

const reducer = createReducer(
  initialState,

  // loadSuperAgent
  on(loadSuperAgentSuccess, (state, { data }) => ({
    ...state,
    data
  }))
);

export function showReducer(state: ShowState, action: Action) {
  return reducer(state, action);
}
