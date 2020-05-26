export interface CreateRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  currency: string;
  locale: string;
  password: string;
}

export interface CreateFormState {
  isSubmitting: boolean;
  errors: CreateFormErrors;
}

export type CreateFormErrors = Partial<CreateRequest>;
