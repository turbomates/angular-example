import { createAction, props } from "@ngrx/store";

import { Master } from "../../master.model";

// Load
export const loadMaster = createAction(
  "[Master | Show] Load master",
  props<{ masterId: string }>()
);

export const loadMasterSuccess = createAction(
  "[Master | Show] Load master success",
  props<{ data: Master }>()
);

export const loadMasterFailed = createAction(
  "[Master | Show] Load master failed"
);

// Clear
export const reset = createAction("[Master | Show] Reset");
