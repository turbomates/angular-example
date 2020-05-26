import { createReducer, on, Action } from "@ngrx/store";

import {
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./change-password.actions";
import { ChangePasswordState } from "../../admin.model";

export const changePasswordFeatureKey = "changePasswordAdmin";

export const initialState: ChangePasswordState = {
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,
  on(submit, state => ({ ...state, isSubmitting: true })),
  on(submitSuccess, state => ({ ...state, isSubmitting: false })),
  on(submitFailed, (state, payload) => ({
    ...state,
    errors: payload.error,
    isSubmitting: false
  })),

  // Clear state
  on(reset, () => initialState)
);

export function changePasswordReducer(
  state: ChangePasswordState,
  action: Action
) {
  return reducer(state, action);
}
