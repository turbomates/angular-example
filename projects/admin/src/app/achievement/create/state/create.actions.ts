import { createAction, props } from "@ngrx/store";

import { CreateFormErrors } from "../create.model";
import { AchievementRequest } from "../../achievements-form/achievements-form.models";

// Submit form
export const submit = createAction(
  "[Achievement | Create] Submit",
  props<{ body: AchievementRequest }>()
);
export const submitSuccess = createAction(
  "[Achievement | Create] Submit success"
);
export const submitFailed = createAction(
  "[Achievement | Create] Submit failed",
  props<{ errors: CreateFormErrors }>()
);

// Clear
export const reset = createAction("[Achievement | Create] Reset");
