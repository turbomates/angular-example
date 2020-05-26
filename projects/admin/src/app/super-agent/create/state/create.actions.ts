import { createAction, props } from "@ngrx/store";

import { CreateFormErrors, CreateRequest } from "../create.model";

// Submit form
export const submit = createAction(
  "[SuperAgent | Create] Submit",
  props<{ body: CreateRequest }>()
);
export const submitSuccess = createAction(
  "[SuperAgent | Create] Submit success"
);
export const submitFailed = createAction(
  "[SuperAgent | Create] Submit failed",
  props<{ errors: CreateFormErrors }>()
);

// Clear
export const reset = createAction("[SuperAgent | Create] Reset");
