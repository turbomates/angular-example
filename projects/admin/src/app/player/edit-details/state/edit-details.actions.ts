import { createAction, props } from "@ngrx/store";

import { EditDetailsRequest, EditDetailsErrors } from "../edit-details.model";
import { Player } from "../../player.model";

export const loadPlayer = createAction(
  "[Player | EditDetails] Load player",
  props<{ playerId: string }>()
);

export const loadPlayerSuccess = createAction(
  "[Player | EditDetails] Load player success",
  props<{ data: Player }>()
);

export const loadPlayerFailed = createAction(
  "[Player | EditDetails] Load player failed"
);

export const submit = createAction(
  "[Player | EditDetails] Submit",
  props<{ playerId: string; body: EditDetailsRequest }>()
);

export const submitSuccess = createAction(
  "[Player | EditDetails] Submit success"
);

export const submitFailed = createAction(
  "[Player | EditDetails] Submit failed",
  props<{ error: EditDetailsErrors }>()
);

// Clear form
export const reset = createAction("[Player | EditDetails] Reset");
