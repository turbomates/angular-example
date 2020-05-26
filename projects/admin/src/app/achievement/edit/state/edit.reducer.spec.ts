import "@angular/core/testing";

import { editFormReducer, initialState } from "./edit.reducer";
import {
  loadAchievementSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { AchievementResponse } from "../../achievement.model";

describe("Edit achievement reducer", () => {
  it("should be save error after submitFailed", () => {
    const errors = {} as any;
    const state = editFormReducer(initialState, submitFailed({ errors }));

    expect(state.errors).toEqual(errors);
  });

  it("should be reset state after reset", () => {
    const data: AchievementResponse = {
      badge:
        "https://vie-media.s3.eu-central-1.amazonaws.com/40aad107-e4e2-4599-ada4-a2a6619be005",
      condition: { amount: 3 },
      description: "test",
      enabled: true,
      fee: 3,
      groupId: "1c700a09-36e3-4845-9daf-15e8ba0f1a65",
      id: "35a9c6c5-8353-4dcd-8390-50376e1c9d71",
      rank: 3,
      repeatable: true,
      title: "test",
      type: "points"
    };
    const stateStart = {
      achievement: data,
      isSubmitting: false,
      errors: {}
    };
    const state = editFormReducer(stateStart, reset());

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

  it("should be save data after loadAchievementSuccess", () => {
    const data = {} as any;
    const state = editFormReducer(
      initialState,
      loadAchievementSuccess({ data })
    );

    expect(state.errors).toEqual(data);
  });
});
