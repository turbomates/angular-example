import { createReducer, on, Action } from "@ngrx/store";

import {
  loadAchievementSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-group.actions";
import { EditGroupFormState } from "../edit-group.model";

export const editGroupFeatureKey = "editGroupAchievementForm";

export const initialState: EditGroupFormState = {
  achievement: null,
  isSubmitting: false,
  errors: {}
};

const reducer = createReducer(
  initialState,

  // loadSuperAgent
  on(loadAchievementSuccess, (state, { data }) => ({
    ...state,
    achievement: data
  })),

  // Submit form
  on(submit, state => ({
    ...state,
    isSubmitting: true
  })),
  on(submitSuccess, state => ({
    ...state,
    isSubmitting: false
  })),
  on(submitFailed, (state, payload) => ({
    ...state,
    isSubmitting: false,
    errors: payload.errors
  })),

  // Clear state
  on(reset, () => initialState)
);

export function editGroupFormReducer(
  state: EditGroupFormState,
  action: Action
) {
  return reducer(state, action);
}
