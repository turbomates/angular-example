import "@angular/core/testing";

import { initialState, listReducer } from "./list.reducer";
import { loadListSuccess } from "./list.actions";

describe("Achievement list reducer", () => {
  it("should be save list after list loading", () => {
    const list = {} as any;

    const state = listReducer(initialState, loadListSuccess({ list }));

    expect(state.list).toEqual(list);
  });
});
