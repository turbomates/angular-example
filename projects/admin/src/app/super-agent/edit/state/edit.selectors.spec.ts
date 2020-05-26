import { initialState } from "./edit.reducer";
import { getData, getFormErrors, getIsSubmitting } from "./edit.selectors";

describe("Edit super agent selectors", () => {
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
      superAgent: {}
    };

    expect(getData.projector(state)).toBe(state.superAgent);
  });
});
