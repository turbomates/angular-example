import { createAction, props } from "@ngrx/store";

import { EditFormErrors } from "../edit.model";
import { AchievementResponse } from "../../achievement.model";
import { AchievementRequest } from "../../achievements-form/achievements-form.models";

// Submit form
export const submit = createAction(
  "[Achievement | Edit] Submit achievement",
  props<{ id: string; body: AchievementRequest }>()
);

export const submitSuccess = createAction(
  "[Achievement | Edit] Submit achievement success"
);

export const submitFailed = createAction(
  "[Achievement | Edit] Submit achievement failed",
  props<{ errors: EditFormErrors }>()
);

// Load SuperAgent
export const loadAchievement = createAction(
  "[Achievement | Edit] Load achievement",
  props<{ id: string }>()
);

export const loadAchievementSuccess = createAction(
  "[Achievement | Edit] Load achievement success",
  props<{ data: AchievementResponse }>()
);

export const loadAchievementFailed = createAction(
  "[Achievement | Edit] Load achievement failed"
);

// delete
export const deleteAchievement = createAction(
  "[Achievement | Edit] Delete achievement",
  props<{ id: string }>()
);

export const deleteAchievementSuccess = createAction(
  "[Achievement | Edit] Delete achievement success"
);

export const deleteAchievementFailed = createAction(
  "[Achievement | Edit] Delete achievement failed"
);

// Clear
export const reset = createAction("[Achievement | Edit] Reset");
