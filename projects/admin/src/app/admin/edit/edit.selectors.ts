import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EditFormState } from "../admin.model";

import { editFeatureKey } from "./edit.reducer";

const getEditFormState = createFeatureSelector<EditFormState>(editFeatureKey);

export const getAdmin = createSelector(
  getEditFormState,
  (state: EditFormState) => state.admin
);

export const getFormErrors = createSelector(
  getEditFormState,
  (state: EditFormState) => state.errors
);

export const getActivityChoices = createSelector(
  getEditFormState,
  (state: EditFormState) => state.activityChoices
);
