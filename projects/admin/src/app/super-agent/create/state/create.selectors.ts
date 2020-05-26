import { createFeatureSelector, createSelector } from "@ngrx/store";

import { createFeatureKey } from "./create.reducer";
import { CreateFormState } from "../create.model";

export const getCreateFormState = createFeatureSelector<CreateFormState>(
  createFeatureKey
);

export const getFormErrors = createSelector(
  getCreateFormState,
  (state: CreateFormState) => state.errors
);

export const getIsSubmitting = createSelector(
  getCreateFormState,
  (state: CreateFormState) => state.isSubmitting
);
