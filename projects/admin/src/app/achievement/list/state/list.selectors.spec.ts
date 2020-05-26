import { initialState } from "./list.reducer";
import { getList } from "./list.selectors";

describe("Achievement list selectors", () => {
  it("should return list", () => {
    const state = {
      ...initialState,
      list: {} as any
    };

    expect(getList.projector(state)).toBe(state.list);
  });
});
