import { createAction, props } from "@ngrx/store";

import { SuperAgent } from "../../super-agent.models";

// Load SuperAgent
export const loadSuperAgent = createAction(
  "[SuperAgent | Show] Load super agent",
  props<{ id: string }>()
);
export const loadSuperAgentSuccess = createAction(
  "[SuperAgent | Show] Load super agent success",
  props<{ data: SuperAgent }>()
);
export const loadSuperAgentFailed = createAction(
  "[SuperAgent | Show] Load super agent failed"
);
