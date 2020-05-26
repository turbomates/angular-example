import { createFeatureSelector, createSelector } from "@ngrx/store";

import { editGroupFeatureKey } from "./edit-group.reducer";
import { EditGroupFormState } from "../edit-group.model";

export const getCreateFormState = createFeatureSelector<EditGroupFormState>(
  editGroupFeatureKey
);

export const getFormErrors = createSelector(
  getCreateFormState,
  (state: EditGroupFormState) => state.errors
);

export const getIsSubmitting = createSelector(
  getCreateFormState,
  (state: EditGroupFormState) => state.isSubmitting
);

export const getData = createSelector(
  getCreateFormState,
  (state: EditGroupFormState) => state.achievement
);
