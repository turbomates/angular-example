import "@angular/core/testing";

import { initialState, editDetailsReducer } from "./edit-details.reducer";
import {
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-details.actions";

describe("Edit details player reducer", () => {
  it("should be save error after submitFailed", () => {
    const error = {} as any;
    const state = editDetailsReducer(initialState, submitFailed({ error }));

    expect(state.errors).toEqual(error);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = editDetailsReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = editDetailsReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = editDetailsReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      player: null,
      isSubmitting: true,
      errors: { firstName: "size" }
    };
    const state = editDetailsReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });
});
