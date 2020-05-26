import { initialState } from "./show.reducer";
import { getData } from "./show.selectors";

describe("Show super agent selectors", () => {
  it("should return error", () => {
    const state = {
      ...initialState,
      data: {}
    };

    expect(getData.projector(state)).toBe(state.data);
  });

  it("should return data", () => {
    const state = {
      ...initialState,
      data: {}
    };

    expect(getData.projector(state)).toBe(state.data);
  });
});
