export interface CreateGroupRequest {
  name: string;
  priority: number;
  show: boolean;
}

export interface CreateGroupFormState {
  isSubmitting: boolean;
  errors: CreateGroupFormErrors;
}

export type CreateGroupFormErrors = Partial<CreateGroupRequest>;
