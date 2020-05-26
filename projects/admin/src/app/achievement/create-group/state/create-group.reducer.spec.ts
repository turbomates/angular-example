import "@angular/core/testing";

import { createGroupFormReducer, initialState } from "./create-group.reducer";
import {
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./create-group.actions";

describe("Create group achievement reducer", () => {
  it("should be save error after submitFailed", () => {
    const errors = {} as any;
    const state = createGroupFormReducer(
      initialState,
      submitFailed({ errors })
    );

    expect(state.errors).toEqual(errors);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      isSubmitting: false,
      errors: {}
    };
    const state = createGroupFormReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = createGroupFormReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = createGroupFormReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = createGroupFormReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });
});
