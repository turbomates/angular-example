import { FormValueModel } from "../achievements-form/achievements-form.models";

export interface CreateFormState {
  isSubmitting: boolean;
  errors: CreateFormErrors;
}

export type CreateFormErrors  = {
  [K in keyof FormValueModel]?: string;
};

