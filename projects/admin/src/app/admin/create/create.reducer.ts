import { createReducer, on, Action } from "@ngrx/store";

import { CreateFormState } from "../admin.model";

import {
  submitFailed,
  loadActivitiesSuccess,
  loadActivitiesFailed,
  reset
} from "./create.actions";

export const createFeatureKey = "createAdminForm";

export const initialState: CreateFormState = {
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

  // Submit form
  on(submitFailed, (state, payload) => ({ ...state, errors: payload.errors })),

  // Clear state
  on(reset, () => initialState)
);

export function createFormReducer(state: CreateFormState, action: Action) {
  return reducer(state, action);
}
