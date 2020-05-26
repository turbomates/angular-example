import { createAction, props } from "@ngrx/store";

import { AchievementResponse } from "../../achievement.model";

// Load Achievement
export const loadAchievement = createAction(
  "[Achievement | Show] Load achievement",
  props<{ id: string }>()
);
export const loadAchievementSuccess = createAction(
  "[Achievement | Show] Load achievement success",
  props<{ data: AchievementResponse }>()
);
export const loadAchievementFailed = createAction(
  "[Achievement | Show] Load achievement failed"
);

// Clear
export const reset = createAction("[Achievement | Show] Reset");
