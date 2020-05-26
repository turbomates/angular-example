import "@angular/core/testing";

import {
  loadAchievementSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-group.actions";
import { editGroupFormReducer, initialState } from "./edit-group.reducer";

describe("Edit group achievement reducer", () => {
  it("should be save error after submitFailed", () => {
    const errors = {} as any;
    const state = editGroupFormReducer(initialState, submitFailed({ errors }));

    expect(state.errors).toEqual(errors);
  });

  it("should be reset state after reset", () => {
    const stateStart = {
      achievement: {} as any,
      isSubmitting: false,
      errors: {}
    };
    const state = editGroupFormReducer(stateStart, reset);

    expect(state).toEqual(initialState);
  });

  it("should be change isSubmitting after submit", () => {
    const payload = {} as any;
    const state = editGroupFormReducer(initialState, submit(payload));

    expect(state.isSubmitting).toBe(true);
  });

  it("should be change isSubmitting after submitSuccess", () => {
    const state = editGroupFormReducer(initialState, submitSuccess());

    expect(state.isSubmitting).toBe(false);
  });

  it("should be change isSubmitting after submitFailed", () => {
    const payload = {} as any;
    const state = editGroupFormReducer(initialState, submitFailed(payload));

    expect(state.isSubmitting).toBe(false);
  });

  it("should be save data after loadSuperAgentSuccess", () => {
    const payload = {} as any;
    const state = editGroupFormReducer(
      initialState,
      loadAchievementSuccess({ data: payload })
    );

    expect(state.achievement).toEqual(payload);
  });
});
