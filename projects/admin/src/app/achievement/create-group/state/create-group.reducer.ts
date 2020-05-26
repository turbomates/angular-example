import { createReducer, on, Action } from "@ngrx/store";

import {
  submitFailed,
  reset,
  submit,
  submitSuccess
} from "./create-group.actions";
import { CreateGroupFormState } from "../create-group.model";

export const createGroupFeatureKey = "createGroupAchievementForm";

export const initialState: CreateGroupFormState = {
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

export function createGroupFormReducer(
  state: CreateGroupFormState,
  action: Action
) {
  return reducer(state, action);
}
