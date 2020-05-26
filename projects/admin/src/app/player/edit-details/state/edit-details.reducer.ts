import { createReducer, on, Action } from "@ngrx/store";

import {
  submitFailed,
  reset,
  submit,
  submitSuccess,
  loadPlayerSuccess
} from "./edit-details.actions";
import { EditDetailsState } from "../edit-details.model";

export const editDetailsFeatureKey = "editDetailsPlayer";

export const initialState: EditDetailsState = {
  player: null,
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,
  on(loadPlayerSuccess, (state, payload) => ({
    ...state,
    player: payload.data
  })),

  // Submit form
  on(submit, state => ({ ...state, isSubmitting: true })),
  on(submitSuccess, state => ({ ...state, isSubmitting: false })),
  on(submitFailed, (state, payload) => ({
    ...state,
    isSubmitting: false,
    errors: payload.error
  })),

  // Clear state
  on(reset, () => initialState)
);

export function editDetailsReducer(state: EditDetailsState, action: Action) {
  return reducer(state, action);
}
