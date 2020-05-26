import { createReducer, on, Action } from "@ngrx/store";

import { AccountState } from "../account.model";
import {
  loadAccountSuccess,
  reset,
  submitFailed,
  submitSendAccountMoney,
  submitSuccess,
  submitTakeAccountMoney
} from "./account.actions";

export const accountFeatureKey = "accountPlayer";

export const initialState: AccountState = {
  accountData: null,
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,

  // Load Account
  on(loadAccountSuccess, (state, { data }) => ({
    ...state,
    accountData: data
  })),

  //  submit
  on(submitSendAccountMoney, state => ({
    ...state,
    isSubmitting: true
  })),
  on(submitTakeAccountMoney, state => ({
    ...state,
    isSubmitting: true
  })),
  on(submitSuccess, state => ({
    ...state,
    isSubmitting: false
  })),
  on(submitFailed, (state, { errors }) => ({
    ...state,
    isSubmitting: false,
    errors
  })),

  // Clear state
  on(reset, () => initialState)
);

export function accountReducer(state: AccountState, action: Action) {
  return reducer(state, action);
}
