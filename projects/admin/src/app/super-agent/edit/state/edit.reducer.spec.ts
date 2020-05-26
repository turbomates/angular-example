import "@angular/core/testing";

import {
  loadSuperAgentSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { editFormReducer, initialState } from "./edit.reducer";

describe("Edit super agent reducer", () => {
  it("should be save error after submitFailed", () => {
    const errors = {} as any;
    const state = editFormReducer(initialState, submitFailed({ errors }));

    expect(state.errors).toEqual(errors);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      superAgent: {} as any,
      isSubmitting: false,
      errors: {}
    };
    const state = editFormReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = editFormReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = editFormReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = editFormReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be save data after loadSuperAgentSuccess", () => {
    const payload = {} as any;
    const state = editFormReducer(
      initialState,
      loadSuperAgentSuccess({ data: payload })
    );

    expect(state.superAgent).toEqual(payload);
  });
});
