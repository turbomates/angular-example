import { createAction, props } from "@ngrx/store";

export const notificationSuccess = createAction(
  "[Notification] Notification success",
  props<{ message: string }>()
);

export const notificationError = createAction(
  "[Notification] Notification error",
  props<{ message: string }>()
);
