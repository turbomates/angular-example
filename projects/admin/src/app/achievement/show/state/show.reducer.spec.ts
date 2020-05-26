import "@angular/core/testing";

import { initialState, showReducer } from "./show.reducer";
import { loadAchievementSuccess, reset } from "./show.actions";
import { ShowState } from "../show.model";

describe("Show achievement reducer", () => {
  it("should be save data after loadAchievementSuccess", () => {
    const payload = {} as any;
    const state = showReducer(
      initialState,
      loadAchievementSuccess({ data: payload })
    );

    expect(state.achievement).toEqual(payload);
  });

  it("should be reset state after reset", () => {
    const data: any = {
      data: "data"
    };
    const stateStart: ShowState = {
      achievement: data
    };
    const state = showReducer(stateStart, reset());

    expect(state).toEqual(initialState);
  });
});
