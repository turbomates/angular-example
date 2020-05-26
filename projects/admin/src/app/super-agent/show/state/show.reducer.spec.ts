import "@angular/core/testing";

import { initialState, showReducer } from "./show.reducer";
import { loadSuperAgentSuccess } from "./show.actions";

describe("Show super agent reducer", () => {
  it("should be save error after submitFailed", () => {
    const data = {} as any;
    const state = showReducer(initialState, loadSuperAgentSuccess({ data }));

    expect(state.data).toEqual(data);
  });

  it("should be save data after loadSuperAgentSuccess", () => {
    const payload = {} as any;
    const state = showReducer(
      initialState,
      loadSuperAgentSuccess({ data: payload })
    );

    expect(state.data).toEqual(payload);
  });
});
