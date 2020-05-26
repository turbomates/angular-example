import { createFeatureSelector, createSelector } from "@ngrx/store";

import { editFeatureKey } from "./edit.reducer";
import { EditFormState } from "../edit.model";

export const getCreateFormState = createFeatureSelector<EditFormState>(
  editFeatureKey
);

export const getFormErrors = createSelector(
  getCreateFormState,
  (state: EditFormState) => state.errors
);

export const getIsSubmitting = createSelector(
  getCreateFormState,
  (state: EditFormState) => state.isSubmitting
);

export const getData = createSelector(
  getCreateFormState,
  (state: EditFormState) => state.superAgent
);
