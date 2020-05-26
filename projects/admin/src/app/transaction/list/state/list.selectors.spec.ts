import { initialState } from "./list.reducer";
import {
  getLoading,
  getList,
  getError,
  getPaginationSearchParams,
  getCurrentTotal
} from "./list.selectors";
import { ListState } from "./list.model";

describe("Transaction list selectors", () => {
  it("should return loading", () => {
    const state = {
      ...initialState,
      loading: true
    };

    expect(getLoading.projector(state)).toBe(state.loading);
  });

  it("should return list", () => {
    const state = {
      ...initialState,
      list: [
        {
          actionType: "PLACE",
          createdAt: "2019-08-08T13:05:56.035Z",
          id: "c967d2c5-d496-42d7-b46e-24a5023f5c14",
          money: { amount: 10, currency: "EUR" },
          status: "HOLD",
          type: "bet",
          updatedAt: "2019-08-08T13:05:56.035Z"
        }
      ]
    };

    expect(getList.projector(state)).toBe(state.list);
  });

  it("should return error", () => {
    const state = {
      ...initialState,
      error: "You don't have permissions for this route"
    };

    expect(getError.projector(state)).toBe(state.error);
  });

  it("should return pagination search params", () => {
    const state = {
      ...initialState,
      currentPage: 25,
      pageSize: 35
    };

    const searchParams = getPaginationSearchParams.projector(state);

    expect(searchParams.currentPage).toBe(state.currentPage);
    expect(searchParams.pageSize).toBe(state.pageSize);
  });

  it("should return current total without more page", () => {
    const state = {
      ...initialState,
      currentPage: 25,
      pageSize: 35,
      hasMore: false
    };

    const mockCurrentTotal =
      (state.currentPage + (state.hasMore ? 1 : 0)) * state.pageSize;

    expect(getCurrentTotal.projector(state)).toBe(mockCurrentTotal);
  });

  it("should return current total with more page", () => {
    const state = {
      ...initialState,
      currentPage: 25,
      pageSize: 35,
      hasMore: true
    };

    const mockCurrentTotal =
      (state.currentPage + (state.hasMore ? 1 : 0)) * state.pageSize;

    expect(getCurrentTotal.projector(state)).toBe(mockCurrentTotal);
  });
});
