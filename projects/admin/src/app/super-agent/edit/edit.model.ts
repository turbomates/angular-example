import { SuperAgent } from "../super-agent.models";

export interface EditRequest {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface EditFormState {
  superAgent: SuperAgent | null;
  isSubmitting: boolean;
  errors: EditFormErrors;
}

export type EditFormErrors = Partial<EditRequest>;
