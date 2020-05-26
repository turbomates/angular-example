import { createReducer, on, Action } from "@ngrx/store";

import { submitFailed, reset, submit, submitSuccess } from "./create.actions";
import { CreateFormState } from "../create.model";

export const createFeatureKey = "createAchievementForm";

export const initialState: CreateFormState = {
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,

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

export function createFormReducer(state: CreateFormState, action: Action) {
  return reducer(state, action);
}
