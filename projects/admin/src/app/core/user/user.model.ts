import { Activity } from "../permission/permission.model";

export interface User {
  activities: Activity[];
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  password: string;
  username: string;
}

export type LoginErrors = Partial<LoginRequest>;

export interface UserState {
  user: User | null;
  errors: LoginErrors;
  isAuthenticated: boolean | null;
  isSubmitting: boolean;
}
