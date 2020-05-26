import { createAction, props } from "@ngrx/store";

import {
  ChangePasswordErrors,
  ChangePasswordRequest
} from "../change-password.model";

export const submit = createAction(
  "[Player | ChangePassword] Submit form",
  props<{ playerId: string; body: ChangePasswordRequest }>()
);

export const submitSuccess = createAction(
  "[Player | ChangePassword] Submit success"
);

export const submitFailed = createAction(
  "[Player | ChangePassword] Submit failed",
  props<{ error: ChangePasswordErrors }>()
);

// Clear form
export const reset = createAction("[Player | ChangePassword] Reset");

