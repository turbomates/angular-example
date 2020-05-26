import { createAction, props } from "@ngrx/store";

import {
  CreateGroupFormErrors,
  CreateGroupRequest
} from "../create-group.model";

// Submit form
export const submit = createAction(
  "[Achievement | CreateGroup] Submit",
  props<{ body: CreateGroupRequest }>()
);
export const submitSuccess = createAction(
  "[Achievement | CreateGroup] Submit success"
);
export const submitFailed = createAction(
  "[Achievement | CreateGroup] Submit failed",
  props<{ errors: CreateGroupFormErrors }>()
);

// Clear
export const reset = createAction("[Achievement | Create] Reset");
