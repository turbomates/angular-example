import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AccountState } from "../account.model";
import { accountFeatureKey } from "./account.reducer";

const getAccountState = createFeatureSelector(accountFeatureKey);

export const getAccount = createSelector(
  getAccountState,
  (state: AccountState) => state.accountData
);

export const getErrors = createSelector(
  getAccountState,
  (state: AccountState) => state.errors
);

export const getIsSubmitting = createSelector(
  getAccountState,
  (state: AccountState) => state.isSubmitting
);
