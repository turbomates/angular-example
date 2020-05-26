import { initialState } from "./edit-group.reducer";
import {
  getData,
  getFormErrors,
  getIsSubmitting
} from "./edit-group.selectors";

describe("Edit group achievement selectors", () => {
  it("should return error", () => {
    const state = {
      ...initialState,
      error: "You don't have permissions for this route"
    };

    expect(getFormErrors.projector(state)).toBe(state.errors);
  });

  it("should return IsSubmitting", () => {
    const state = {
      ...initialState,
      isSubmitting: true
    };

    expect(getIsSubmitting.projector(state)).toBe(state.isSubmitting);
  });

  it("should return data", () => {
    const state = {
      ...initialState,
      achievement: {}
    };

    expect(getData.projector(state)).toBe(state.achievement);
  });
});
