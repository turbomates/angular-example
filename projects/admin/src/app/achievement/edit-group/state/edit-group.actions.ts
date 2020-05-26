import { createAction, props } from "@ngrx/store";

import { EditGroupFormData, EditGroupFormErrors } from "../edit-group.model";
import { AchievementGroup } from "../../achievement.model";

// Submit form
export const submit = createAction(
  "[Achievement | EditGroup] Submit",
  props<{ id: string; body: EditGroupFormData }>()
);

export const submitSuccess = createAction(
  "[Achievement | EditGroup] Submit success"
);

export const submitFailed = createAction(
  "[Achievement | EditGroup] Submit failed",
  props<{ errors: EditGroupFormErrors }>()
);

// Load SuperAgent
export const loadAchievement = createAction(
  "[Achievement | EditGroup] Load achievement",
  props<{ id: string }>()
);

export const loadAchievementSuccess = createAction(
  "[Achievement | EditGroup] Load achievement success",
  props<{ data: AchievementGroup }>()
);

export const loadAchievementFailed = createAction(
  "[Achievement | EditGroup] Load achievement failed"
);

// Clear
export const reset = createAction("[Achievement | EditGroup] Reset");
