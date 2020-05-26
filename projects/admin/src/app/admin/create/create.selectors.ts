import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CreateFormState } from "../admin.model";

import { createFeatureKey } from "./create.reducer";

export const getCreateFormState = createFeatureSelector<CreateFormState>(
  createFeatureKey
);

export const getActivityChoices = createSelector(
  getCreateFormState,
  (state: CreateFormState) => state.activityChoices
);

export const getFormErrors = createSelector(
  getCreateFormState,
  (state: CreateFormState) => state.errors
);
