import { initialState } from "./change-password.reducer";
import { getError, getIsSubmitting } from "./change-password.selectors";

describe("Change password player selectors", () => {
  it("should return error", () => {
    const state = {
      ...initialState,
      errors: "You don't have permissions for this route"
    };

    expect(getError.projector(state)).toEqual(state.errors);
  });

  it("should return IsSubmitting", () => {
    const state = {
      ...initialState,
      isSubmitting: true
    };

    expect(getIsSubmitting.projector(state)).toBe(state.isSubmitting);
  });
});
