import { createReducer, on, Action } from "@ngrx/store";

import { EditFormState } from "../admin.model";

import {
  submitFailed,
  loadActivitiesSuccess,
  loadActivitiesFailed,
  loadAdminSuccess,
  loadAdminFailed,
  reset
} from "./edit.actions";

export const editFeatureKey = "editAdminForm";

export const initialState: EditFormState = {
  admin: null,
  errors: {},
  activityChoices: []
};

const reducer = createReducer(
  initialState,

  // Load activities
  on(loadActivitiesSuccess, (state, { activityChoices }) => ({
    ...state,
    activityChoices
  })),
  on(loadActivitiesFailed, state => ({ ...state, activityChoices: [] })),

  // Load admin
  on(loadAdminSuccess, (state, { admin }) => ({
    ...state,
    admin
  })),
  on(loadAdminFailed, state => ({ ...state, admin: null })),

  // Submit form
  on(submitFailed, (state, payload) => ({ ...state, errors: payload.errors })),

  // Clear state
  on(reset, () => initialState)
);

export function editFormReducer(state: EditFormState, action: Action) {
  return reducer(state, action);
}
