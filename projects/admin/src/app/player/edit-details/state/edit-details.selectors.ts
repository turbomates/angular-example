import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EditDetailsState } from "../edit-details.model";
import { editDetailsFeatureKey } from "./edit-details.reducer";

const getEditState = createFeatureSelector(editDetailsFeatureKey);

export const getErrors = createSelector(
  getEditState,
  (state: EditDetailsState) => state.errors
);

export const getIsSubmitting = createSelector(
  getEditState,
  (state: EditDetailsState) => state.isSubmitting
);

export const getData = createSelector(
  getEditState,
  (state: EditDetailsState) => state.player
);
