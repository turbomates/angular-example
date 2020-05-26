import { createAction, props } from "@ngrx/store";

import {
  EditPreferencesErrors,
  EditPreferencesRequest
} from "../edit-preferences.model";
import { Player } from "../../player.model";

export const loadPlayer = createAction(
  "[Player | EditPreferences] Load player",
  props<{ playerId: string }>()
);

export const loadPlayerSuccess = createAction(
  "[Player | EditPreferences] Load player success",
  props<{ data: Player }>()
);

export const loadPlayerFailed = createAction(
  "[Player | EditPreferences] Load player failed"
);

export const submit = createAction(
  "[Player | EditPreferences] Submit",
  props<{ playerId: string; body: EditPreferencesRequest }>()
);

export const submitSuccess = createAction(
  "[Player | EditPreferences] Submit success"
);

export const submitFailed = createAction(
  "[Player | EditPreferences] Submit failed",
  props<{ error: EditPreferencesErrors }>()
);

// Clear form
export const reset = createAction("[Player | EditPreferences] Reset");

