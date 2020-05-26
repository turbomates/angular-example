import { createAction, props } from "@ngrx/store";

import { EditFormErrors, EditRequest } from "../edit.model";
import { SuperAgent } from "../../super-agent.models";

// Submit form
export const submit = createAction(
  "[SuperAgent | Edit] Submit",
  props<{ id: string; body: EditRequest }>()
);

export const submitSuccess = createAction("[SuperAgent | Edit] Submit success");

export const submitFailed = createAction(
  "[SuperAgent | Edit] Submit failed",
  props<{ errors: EditFormErrors }>()
);

// Load SuperAgent
export const loadSuperAgent = createAction(
  "[SuperAgent | Edit] Load super agent",
  props<{ id: string }>()
);

export const loadSuperAgentSuccess = createAction(
  "[SuperAgent | Edit] Load super agent success",
  props<{ data: SuperAgent }>()
);

export const loadSuperAgentFailed = createAction(
  "[SuperAgent | Edit] Load super agent failed"
);

// Clear
export const reset = createAction("[SuperAgent | Edit] Reset");
