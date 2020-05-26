import { createAction, props } from "@ngrx/store";

import { Account, AccountFormErrors, AccountRequest } from "../account.model";

export const loadAccount = createAction(
  "[Player | Account] Load account",
  props<{ playerId: string }>()
);

export const loadAccountSuccess = createAction(
  "[Player | Account] Load account success",
  props<{ data: Account[] }>()
);

export const loadAccountFailed = createAction(
  "[Player | Account] Load account failed"
);

// submit TakeAccountMoney
export const submitTakeAccountMoney = createAction(
  "[Player | Account] Take account money",
  props<{ accountMoney: AccountRequest; accountId: string; playerId: string }>()
);

// submit SendAccountMoney
export const submitSendAccountMoney = createAction(
  "[Player | Account] Send account money",
  props<{ accountMoney: AccountRequest; accountId: string; playerId: string }>()
);

export const submitSuccess = createAction(
  "[Player | Account] Submit account success",
  props<{ playerId: string }>()
);

export const submitFailed = createAction(
  "[Player | Account] Submit account failed",
  props<{ errors: AccountFormErrors }>()
);

// Clear
export const reset = createAction("[Player | Account] Reset");
