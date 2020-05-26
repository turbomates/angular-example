import { createFeatureSelector, createSelector } from "@ngrx/store";

import { changePasswordFeatureKey } from "./change-password.reducer";
import { ChangePasswordState } from "../change-password.model";

const getShowState = createFeatureSelector(changePasswordFeatureKey);

export const getError = createSelector(
  getShowState,
  (state: ChangePasswordState) => state.errors
);

export const getIsSubmitting = createSelector(
  getShowState,
  (state: ChangePasswordState) => state.isSubmitting
);
