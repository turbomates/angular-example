import { createReducer, on, Action } from "@ngrx/store";

import { loadListSuccess } from "./list.actions";
import { ListState } from "../list.models";

export const listFeatureKey = "listAchievement";

export const initialState: ListState = {
  list: []
};

const reducer = createReducer(
  initialState,

  on(loadListSuccess, (state, { list }) => ({
    ...state,
    list
  }))
);

export function listReducer(state: ListState, action: Action) {
  return reducer(state, action);
}
