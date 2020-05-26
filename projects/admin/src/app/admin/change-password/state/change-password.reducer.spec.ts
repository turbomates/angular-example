import "@angular/core/testing";

import { changePasswordReducer, initialState } from "./change-password.reducer";
import {
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./change-password.actions";

describe("Admin change password reducer", () => {
  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = changePasswordReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = changePasswordReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = changePasswordReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be save error", () => {
    const httpErrorResponse: any = {
      error: [{ property: "newPassword", value: "", message: "Size" }]
    };

    const state = changePasswordReducer(
      initialState,
      submitFailed({ error: httpErrorResponse })
    );

    expect(state.errors).toEqual(httpErrorResponse);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      isSubmitting: true,
      errors: { newPassword: "size" }
    };
    const state = changePasswordReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });
});
