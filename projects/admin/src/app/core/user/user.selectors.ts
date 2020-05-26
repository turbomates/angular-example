import { createFeatureSelector, createSelector } from "@ngrx/store";

import { userKey } from "./user.reducer";
import { UserState } from "./user.model";

export const getUserState = createFeatureSelector<UserState>(userKey);

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state.user
);

export const getLoginErrors = createSelector(
  getUserState,
  (state: UserState) => state.errors
);

export const getIsAuthenticated = createSelector(
  getUserState,
  (state: UserState) => state.isAuthenticated
);

export const getIsSubmitting = createSelector(
  getUserState,
  (state: UserState) => state.isSubmitting
);
