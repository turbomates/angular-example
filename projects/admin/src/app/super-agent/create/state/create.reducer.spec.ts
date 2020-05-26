import "@angular/core/testing";

import { createFormReducer, initialState } from "./create.reducer";
import { reset, submit, submitFailed, submitSuccess } from "./create.actions";

describe("Create super agent reducer", () => {
  it("should be save error after submitFailed", () => {
    const errors = {} as any;
    const state = createFormReducer(initialState, submitFailed({ errors }));

    expect(state.errors).toEqual(errors);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      isSubmitting: false,
      errors: {}
    };
    const state = createFormReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = createFormReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = createFormReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = createFormReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });
});
