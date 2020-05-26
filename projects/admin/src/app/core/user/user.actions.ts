import { createAction, props } from "@ngrx/store";

import { User, LoginRequest, LoginErrors } from "./user.model";

// Login user
export const login = createAction(
  "[user] Login",
  props<{ body: LoginRequest }>()
);

export const loginSuccess = createAction("[user] Login success");

export const loginFailed = createAction(
  "[user] Login",
  props<{ errors: LoginErrors }>()
);

// Logout
export const logout = createAction("[user] Logout");

export const logoutSuccess = createAction("[user] Logout success");

// Load user
export const loadUser = createAction("[user] Load user");

export const loadUserSuccess = createAction(
  "[user] Load user success",
  props<{ user: User }>()
);

export const loadUserFailed = createAction("[user] Load user failed");

// Clear user
export const clear = createAction("[user] Clear");
