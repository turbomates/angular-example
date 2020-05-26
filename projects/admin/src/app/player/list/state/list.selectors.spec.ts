import { initialState } from "./list.reducer";
import {
  getLoading,
  getList,
  getError,
  getPaginationSearchParams,
  getCurrentTotal
} from "./list.selectors";

describe("Player list selectors", () => {
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
          avatar: "avatar",
          birthday: "01/01/01",
          city: "city",
          country: "country",
          currency: "currency",
          email: "email",
          firstName: "firstName",
          gender: "male",
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
          zip: "zip"
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
