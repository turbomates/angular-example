export interface ChangePasswordState {
  isSubmitting: boolean;
  errors: ChangePasswordErrors;
}
export interface ChangePasswordErrors {
  newPassword?: string;
}

export interface ChangePasswordRequest {
  newPassword: string;
}
