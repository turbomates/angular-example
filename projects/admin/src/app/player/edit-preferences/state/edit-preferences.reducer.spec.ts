import "@angular/core/testing";

import {
  initialState,
  editPreferencesReducer
} from "./edit-preferences.reducer";
import {
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-preferences.actions";

describe("Edit preferences player reducer", () => {
  it("should be save error after submitFailed", () => {
    const error = {} as any;
    const state = editPreferencesReducer(initialState, submitFailed({ error }));

    expect(state.errors).toEqual(error);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = editPreferencesReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = editPreferencesReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = editPreferencesReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      playerPreference: null,
      isSubmitting: true,
      errors: { locale: "size" }
    };
    const state = editPreferencesReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });
});
