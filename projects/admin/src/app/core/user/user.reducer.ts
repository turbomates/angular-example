import { createReducer, on, Action } from "@ngrx/store";

import { UserState } from "./user.model";
import {
  clear,
  loadUserSuccess,
  loginFailed,
  loginSuccess,
  login,
  logoutSuccess,
  loadUserFailed
} from "./user.actions";

export const userKey = "user";

export const initialState: UserState = {
  user: null,
  isAuthenticated: null,
  errors: {},
  isSubmitting: false
};

const reducer = createReducer(
  initialState,

  // Load user
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true
  })),

  on(loadUserFailed, state => ({
    ...state,
    isAuthenticated: false
  })),

  // Login
  on(login, state => ({
    ...state,
    isSubmitting: true
  })),

  on(loginSuccess, state => ({
    ...state,
    isAuthenticated: true,
    isSubmitting: false
  })),

  on(loginFailed, (state, { errors }) => ({
    ...state,
    errors,
    isAuthenticated: false,
    isSubmitting: false
  })),

  // Logout
  on(logoutSuccess, state => ({
    ...state,
    isAuthenticated: false
  })),

  // Clear state
  on(clear, () => initialState)
);

export function userReducer(state: UserState, action: Action) {
  return reducer(state, action);
}
