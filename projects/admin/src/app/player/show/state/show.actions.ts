import { createAction, props } from "@ngrx/store";

import { Player } from "../../player.model";

export const loadPlayer = createAction(
  "[Player | Show] Load player",
  props<{ playerId: string }>()
);

export const loadPlayerSuccess = createAction(
  "[Player | Show] Load player success",
  props<{ data: Player }>()
);

export const loadPlayerFailed = createAction("[Player | Show] Load player failed");

// Clear
export const reset = createAction("[Player | Show] Reset");
