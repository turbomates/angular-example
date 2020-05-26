import "@angular/core/testing";

import { accountReducer, initialState } from "./account.reducer";
import {
  loadAccountSuccess,
  reset,
  submitFailed,
  submitSendAccountMoney,
  submitSuccess,
  submitTakeAccountMoney
} from "./account.actions";
import { Account, AccountState } from "../account.model";

describe("Account player reducer", () => {
  it("should be save account after loading", () => {
    const data = {} as any;

    const state = accountReducer(initialState, loadAccountSuccess({ data }));

    expect(state.accountData).toBe(data);
  });

  it("should be save error after submitFailed", () => {
    const errors = {} as any;

    const state = accountReducer(initialState, submitFailed({ errors }));

    expect(state.errors).toEqual(errors);
  });

  it("should be change isSubmitting after submitTakeAccountMoney", () => {
    const payload = {} as any;
    const state = accountReducer(initialState, submitTakeAccountMoney(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSendAccountMoney", () => {
    const payload = {} as any;
    const state = accountReducer(initialState, submitSendAccountMoney(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = accountReducer(initialState, submitSuccess({ playerId: "" }));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = accountReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be reset state after reset", () => {
    const data: Account = {
      id: "123",
      balance: {
        currency: "4654",
        amount: 456
      }
    };
    const stateStart: AccountState = {
      accountData: [data],
      isSubmitting: false,
      errors: {}
    };
    const state = accountReducer(stateStart, reset());

    expect(state).toEqual(initialState);
  });
});
