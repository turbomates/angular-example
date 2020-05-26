import { createFeatureSelector, createSelector } from "@ngrx/store";

import { createGroupFeatureKey } from "./create-group.reducer";
import { CreateGroupFormState } from "../create-group.model";

export const getCreateFormState = createFeatureSelector<CreateGroupFormState>(
  createGroupFeatureKey
);

export const getFormErrors = createSelector(
  getCreateFormState,
  (state: CreateGroupFormState) => state.errors
);

export const getIsSubmitting = createSelector(
  getCreateFormState,
  (state: CreateGroupFormState) => state.isSubmitting
);
