import { createAction, props } from "@ngrx/store";

import { ChangePasswordErrors, ChangePasswordRequest } from "../../admin.model";

export const submit = createAction(
  "[Admin | ChangePassword] Submit form",
  props<{ adminId: string; body: ChangePasswordRequest }>()
);

export const submitSuccess = createAction(
  "[Admin | ChangePassword] Submit success"
);

export const submitFailed = createAction(
  "[Admin | ChangePassword] Submit failed",
  props<{ error: ChangePasswordErrors }>()
);

// Clear form
export const reset = createAction("[Admin | ChangePassword] Reset");
