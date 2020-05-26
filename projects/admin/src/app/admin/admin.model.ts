import { Choice, Error } from "src/app/common/models";

export interface Admin {
  activities: string[];
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  username: string;
}

export interface CreateAdminRequest {
  email: string;
  lastName: string;
  username: string;
  firstName: string;
  password: string;
  activities: string[];
  isSuper: boolean;
}

export interface EditAdminRequest {
  activities: string[];
  firstName: string;
  isSuper: boolean;
  lastName: string;
}

export type CreateAdminErrors = {
  [K in keyof CreateAdminRequest]?: string;
};

export type EditAdminErrors = {
  [K in keyof EditAdminRequest]?: string;
};

export interface CreateFormState {
  errors: CreateAdminErrors;
  activityChoices: Choice[];
}

export interface EditFormState {
  admin: Admin | null;
  errors: CreateAdminErrors;
  activityChoices: Choice[];
}

export interface ListState {
  list: Admin[];
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  error: Error | null;
}

export interface ChangePasswordState {
  isSubmitting: boolean;
  errors: ChangePasswordErrors;
}

export interface ChangePasswordRequest {
  newPassword: string;
}

export type ChangePasswordErrors = {
  [K in keyof ChangePasswordRequest]?: string;
};
