import "@angular/core/testing";

import { initialState, showReducer } from "./show.reducer";
import { loadPlayerSuccess, reset } from "./show.actions";
import { Player } from "../../player.model";
import { ShowState } from "../show.model";

describe("Show player reducer", () => {
  it("should be save player after player loading", () => {
    const data: Player = {
      avatar: "avatar",
      birthday: "01/01/01",
      city: "city",
      country: "country",
      currency: "currency",
      email: "email",
      firstName: "firstName",
      house: "house",
      id: "id",
      lastName: "lastName",
      locale: "locale",
      mobileNumber: "mobileNumber",
      oddFormat: "oddFormat",
      phoneNumber: "phoneNumber",
      state: "state",
      street: "street",
      username: "username",
      zip: "zip",
      gender: null
    };

    const state = showReducer(initialState, loadPlayerSuccess({ data }));

    expect(state.playerData).toBe(data);
  });

  it("should be reset state after reset", () => {
    const data: Player = {
      avatar: "avatar",
      birthday: "01/01/01",
      city: "city",
      country: "country",
      currency: "currency",
      email: "email",
      firstName: "firstName",
      house: "house",
      id: "id",
      lastName: "lastName",
      locale: "locale",
      mobileNumber: "mobileNumber",
      oddFormat: "oddFormat",
      phoneNumber: "phoneNumber",
      state: "state",
      street: "street",
      username: "username",
      zip: "zip",
      gender: null
    };
    const stateStart: ShowState = {
      playerData: data
    };
    const state = showReducer(stateStart, reset());

    expect(state).toEqual(initialState);
  });
});
