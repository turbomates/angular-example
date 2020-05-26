import { createSelector } from "@ngrx/store";

import { getMasterState, MasterState } from "..";
import { editFeatureKey, EditFormState } from "./edit.reducer";

export const getEditState = createSelector(
  getMasterState,
  (state: MasterState) => state[editFeatureKey]
);

export const getData = createSelector(
  getEditState,
  (state: EditFormState) => state.master
);

export const getErrors = createSelector(
  getEditState,
  (state: EditFormState) => state.errors
);

export const getSubmitting = createSelector(
  getEditState,
  (state: EditFormState) => state.isSubmitting
);
