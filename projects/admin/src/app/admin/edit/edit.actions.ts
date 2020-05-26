import { createAction, props } from "@ngrx/store";

import { Choice } from "src/app/common/models";

import { EditAdminErrors, EditAdminRequest, Admin } from "../admin.model";

// Submit form
export const submit = createAction(
  "[Admin | Edit] Submit",
  props<{ adminId: string; body: EditAdminRequest }>()
);

export const submitFailed = createAction(
  "[Admin | Edit] Submit failed",
  props<{ errors: EditAdminErrors }>()
);

// Load admin
export const loadAdmin = createAction(
  "[Admin | Edit] Load admin",
  props<{ id: string }>()
);

export const loadAdminSuccess = createAction(
  "[Admin | Edit] Load admin success",
  props<{ admin: Admin }>()
);

export const loadAdminFailed = createAction("[Admin | Edit] Load admin failed");

// Load activities
export const loadActivities = createAction("[Admin | Edit] Load activities");

export const loadActivitiesSuccess = createAction(
  "[Admin | Edit] Load activities success",
  props<{ activityChoices: Choice[] }>()
);

export const loadActivitiesFailed = createAction(
  "[Admin | Edit] Load activities failed"
);

// Clear
export const reset = createAction("[Admin | Edit] Reset");
