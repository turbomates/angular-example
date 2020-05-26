import { initialState } from "./show.reducer";
import { getPlayer } from "./show.selectors";

describe("Show player selectors", () => {
  it("should return player", () => {
    const state = {
      ...initialState,
      playerData: {} as any
    };

    expect(getPlayer.projector(state)).toBe(state.playerData);
  });
});
