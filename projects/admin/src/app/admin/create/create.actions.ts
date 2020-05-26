import { createAction, props } from "@ngrx/store";

import { Choice } from "src/app/common/models";

import { CreateAdminErrors, CreateAdminRequest } from "../admin.model";

// Submit form
export const submit = createAction(
  "[Admin | Create] Submit",
  props<{ body: CreateAdminRequest }>()
);

export const submitFailed = createAction(
  "[Admin | Create] Submit failed",
  props<{ errors: CreateAdminErrors }>()
);

// Load activities
export const loadActivities = createAction("[Admin | Create] Load activities");

export const loadActivitiesSuccess = createAction(
  "[Admin | Create] Load activities success",
  props<{ activityChoices: Choice[] }>()
);

export const loadActivitiesFailed = createAction(
  "[Admin | Create] Load activities failed"
);

// Clear
export const reset = createAction("[Admin | Create] Reset");
