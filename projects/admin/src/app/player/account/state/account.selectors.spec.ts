import { initialState } from "./account.reducer";
import { getErrors, getAccount, getIsSubmitting } from "./account.selectors";

describe("Account player selectors", () => {
  it("should return account", () => {
    const state = {
      ...initialState,
      accountData: {} as any
    };

    expect(getAccount.projector(state)).toBe(state.accountData);
  });

  it("should return account", () => {
    const state = {
      ...initialState,
      accountData: {} as any
    };

    expect(getAccount.projector(state)).toBe(state.accountData);
  });

  it("should return error", () => {
    const state = {
      ...initialState,
      errors: "You don't have permissions for this route"
    };

    expect(getErrors.projector(state)).toBe(state.errors);
  });

  it("should return isSubmitting", () => {
    const state = {
      ...initialState,
      isSubmitting: true
    };

    expect(getIsSubmitting.projector(state)).toBe(state.isSubmitting);
  });
});
