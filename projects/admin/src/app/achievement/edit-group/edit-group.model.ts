import { AchievementGroup } from "../achievement.model";

export interface EditGroupRequest {
  name: string;
  priority: string;
  show: boolean;
}

export interface EditGroupFormData {
  name: string;
  priority: number;
  show: boolean;
}

export interface EditGroupFormState {
  achievement: AchievementGroup | null;
  isSubmitting: boolean;
  errors: EditGroupFormErrors;
}

export type EditGroupFormErrors = Partial<EditGroupRequest>;
