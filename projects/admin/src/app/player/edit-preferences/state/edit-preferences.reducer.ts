import { createReducer, on, Action } from "@ngrx/store";

import {
  submitFailed,
  reset,
  submitSuccess,
  submit,
  loadPlayerSuccess
} from "./edit-preferences.actions";
import { EditPreferencesState } from "../edit-preferences.model";

export const editPreferencesFeatureKey = "editPreferencesPlayer";

export const initialState: EditPreferencesState = {
  playerPreference: null,
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,

  on(loadPlayerSuccess, (state, payload) => ({
    ...state,
    playerPreference: payload.data
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

export function editPreferencesReducer(
  state: EditPreferencesState,
  action: Action
) {
  return reducer(state, action);
}
