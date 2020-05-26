import { createFeatureSelector, createSelector } from "@ngrx/store";

import { editPreferencesFeatureKey } from "./edit-preferences.reducer";
import { EditPreferencesState } from "../edit-preferences.model";

const getEditState = createFeatureSelector(editPreferencesFeatureKey);

export const getErrors = createSelector(
  getEditState,
  (state: EditPreferencesState) => state.errors
);

export const getIsSubmitting = createSelector(
  getEditState,
  (state: EditPreferencesState) => state.isSubmitting
);

export const getEditData = createSelector(
  getEditState,
  (state: EditPreferencesState) => state.playerPreference
);
