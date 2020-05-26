import "@angular/core/testing";

import { ListResponse } from "src/app/common/models";

import {
  updateCurrentPage,
  updatePageSize,
  loadList,
  loadListSuccess,
  loadListFailed,
  updateScope
} from "./list.actions";
import { listInitialState, listReducer } from "./list.reducer";
import { Lottery, SearchParams } from "../../lottery.model";

describe("Lottery list reducer", () => {
  it("should be save current page", () => {
    const state = listReducer(
      listInitialState,
      updateCurrentPage({ currentPage: 33 })
    );

    expect(state.currentPage).toBe(33);
  });

  it("should be save page size", () => {
    const state = listReducer(
      listInitialState,
      updatePageSize({ pageSize: 50 })
    );

    expect(state.pageSize).toBe(50);
  });

  it("should be save scope", () => {
    const state = listReducer(
      listInitialState,
      updateScope({ scopeType: "settle" })
    );

    expect(state.type).toBe("settle");
  });

  it("should be save loading status", () => {
    const state = listReducer(
      listInitialState,
      loadList({ params: { currentPage: 25, pageSize: 60, type: "settle" } })
    );

    expect(state.isLoading).toBe(true);
  });

  it("should be save list after list loading", () => {
    const list: ListResponse<Lottery> = {
      data: [
        {
          appearAt: "2019-12-31T22:00:21.000Z",
          description: "test",
          finishAt: "2020-01-02T22:00:21.000Z",
          id: "80139177-b2b1-4da1-b9d5-2948a1c0b47a",
          images: [],
          minTicketsCount: 10,
          multiEnter: true,
          name: "test18/10",
          price: 45,
          prize: { amount: 100, currency: "EUR" },
          startAt: "2020-01-01T22:00:21.000Z",
          status: "CANCEL",
          ticketsCount: 0
        }
      ],
      currentPage: 33,
      hasMore: true,
      pageSize: 25
    };

    const searchParams: SearchParams = {
      pageSize: 30,
      currentPage: 2,
      type: "settle"
    };

    const state = listReducer(
      listInitialState,
      loadListSuccess({ data: list, params: searchParams })
    );

    expect(state.data).toBe(list.data);
    expect(state.currentPage).toBe(list.currentPage);
    expect(state.pageSize).toBe(list.pageSize);
    expect(state.hasMore).toBe(list.hasMore);
    expect(state.isLoading).toBe(false);
  });

  it("should be save error", () => {
    const httpErrorResponse: any = {
      error: { error: "You don't have permissions for this route" }
    };

    const state = listReducer(
      listInitialState,
      loadListFailed({ error: httpErrorResponse })
    );

    expect(state.error).toBe(httpErrorResponse);
  });
});
