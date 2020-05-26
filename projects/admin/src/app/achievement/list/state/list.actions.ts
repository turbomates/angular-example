import { createAction, props } from "@ngrx/store";

import { Error } from "src/app/common/models";

import { GroupedAchievement } from "../list.models";

// Load list
export const loadList = createAction("[Achievement | List] Load list");

export const loadListSuccess = createAction(
  "[Achievement | List] List success",
  props<{ list: GroupedAchievement[] }>()
);

export const loadListFailed = createAction(
  "[Achievement | List] List failed",
  props<{ error: Error }>()
);
