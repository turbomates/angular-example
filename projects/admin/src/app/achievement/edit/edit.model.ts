import { AchievementResponse } from "../achievement.model";
import { FormValueModel } from "../achievements-form/achievements-form.models";

export interface EditFormState {
  achievement: AchievementResponse | null;
  isSubmitting: boolean;
  errors: EditFormErrors;
}

export type EditFormErrors = {
  [K in keyof FormValueModel]?: string;
};
