import { createFeatureSelector, createSelector } from "@ngrx/store";

import { changePasswordFeatureKey } from "./change-password.reducer";
import { ChangePasswordState } from "../../admin.model";

const getChangePasswordState = createFeatureSelector(changePasswordFeatureKey);

export const getError = createSelector(
  getChangePasswordState,
  (state: ChangePasswordState) => state.errors
);

export const getIsSubmitting = createSelector(
  getChangePasswordState,
  (state: ChangePasswordState) => state.isSubmitting
);
