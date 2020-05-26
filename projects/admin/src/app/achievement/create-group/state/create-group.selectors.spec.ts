import { initialState } from "./create-group.reducer";
import { getFormErrors, getIsSubmitting } from "./create-group.selectors";

describe("Create group achievement selectors", () => {
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
});
