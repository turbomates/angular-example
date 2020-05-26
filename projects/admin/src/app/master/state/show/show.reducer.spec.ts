import "@angular/core/testing";

import { showInitialState, showReducer, ShowState } from "./show.reducer";
import { Master } from "../../master.model";
import { loadMasterSuccess, reset } from "./show.actions";

describe("Show master reducer", () => {
  it("should be save master after master loading", () => {
    const data: Master = {
      phone: "123",
      currency: "BY",
      email: "email",
      username: "username",
      locale: "BY",
      lastName: "lastName",
      id: "id",
      firstName: "firstName"
    };

    const state = showReducer(showInitialState, loadMasterSuccess({ data }));

    expect(state.masterData).toBe(data);
  });

  it("should be reset state after reset", () => {
    const data: Master = {
      phone: "123",
      currency: "BY",
      email: "email",
      username: "username",
      locale: "BY",
      lastName: "lastName",
      id: "id",
      firstName: "firstName"
    };
    const stateStart: ShowState = {
      masterData: data
    };
    const state = showReducer(stateStart, reset());

    expect(state).toEqual(showInitialState);
  });
});
