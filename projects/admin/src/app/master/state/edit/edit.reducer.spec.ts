import "@angular/core/testing";

import {
  loadMasterSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { editInitialState, editReducer } from "./edit.reducer";

describe("Edit master reducer", () => {
  it("should be save error after submitFailed", () => {
    const errors = {} as any;
    const state = editReducer(editInitialState, submitFailed({ errors }));

    expect(state.errors).toEqual(errors);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      master: {} as any,
      isSubmitting: false,
      errors: { firstName: "size" }
    };
    const state = editReducer(stateStart, reset);

    expect(state).toEqual(editInitialState);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = editReducer(editInitialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = editReducer(editInitialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = editReducer(editInitialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be save data after loadMasterSuccess", () => {
    const payload = {} as any;
    const state = editReducer(
      editInitialState,
      loadMasterSuccess({ data: payload })
    );

    expect(state.master).toEqual(payload);
  });
});
