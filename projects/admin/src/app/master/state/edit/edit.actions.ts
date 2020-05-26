import { createAction, props } from "@ngrx/store";

import { Master } from "../../master.model";
import { EditFormErrors, EditFormRequest } from "./edit.model";

// Load
export const loadMaster = createAction(
  "[Master | Edit] Load master",
  props<{ id: string }>()
);

export const loadMasterSuccess = createAction(
  "[Master | Edit] Load master success",
  props<{ data: Master }>()
);

export const loadMasterFailed = createAction(
  "[Master | Edit] Load master failed"
);

// Submit form
export const submit = createAction(
  "[Master | Edit] Submit",
  props<{ id: string; body: EditFormRequest }>()
);

export const submitSuccess = createAction("[Master | Edit] Submit success");

export const submitFailed = createAction(
  "[Master | Edit] Submit failed",
  props<{ errors: EditFormErrors }>()
);

// clear state
export const reset = createAction("[Master | Edit] reset");
