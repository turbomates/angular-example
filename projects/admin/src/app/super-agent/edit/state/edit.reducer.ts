import { createReducer, on, Action } from "@ngrx/store";

import {
  loadSuperAgentSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { EditFormState } from "../edit.model";

export const editFeatureKey = "editAdminForm";

export const initialState: EditFormState = {
  superAgent: null,
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,

  // loadSuperAgent
  on(loadSuperAgentSuccess, (state, { data }) => ({
    ...state,
    superAgent: data
  })),

  // Submit form
  on(submit, state => ({
    ...state,
    isSubmitting: true
  })),
  on(submitSuccess, state => ({
    ...state,
    isSubmitting: false
  })),
  on(submitFailed, (state, payload) => ({
    ...state,
    isSubmitting: false,
    errors: payload.errors
  })),

  // Clear state
  on(reset, () => initialState)
);

export function editFormReducer(state: EditFormState, action: Action) {
  return reducer(state, action);
}
