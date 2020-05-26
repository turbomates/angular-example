import "@angular/core/testing";
import { ListResponse } from "src/app/common/models";

import { Transaction } from "./list.model";
import { initialState, listReducer } from "./list.reducer";
import {
  updateCurrentPage,
  updatePageSize,
  loadList,
  loadListSuccess,
  loadListFailed
} from "./list.actions";

describe("Transaction list reducer", () => {
  it("should be save current page", () => {
    const state = listReducer(
      initialState,
      updateCurrentPage({ currentPage: 33 })
    );

    expect(state.currentPage).toBe(33);
  });

  it("should be save page size", () => {
    const state = listReducer(initialState, updatePageSize({ pageSize: 50 }));

    expect(state.pageSize).toBe(50);
  });

  it("should be save loading status", () => {
    const state = listReducer(
      initialState,
      loadList({ params: { currentPage: 25, pageSize: 60 } })
    );

    expect(state.loading).toBe(true);
  });

  it("should be save list after list loading", () => {
    const list: ListResponse<Transaction> = {
      data: [
        {
          actionType: "PLACE",
          createdAt: "2019-08-08T13:05:56.035Z",
          id: "c967d2c5-d496-42d7-b46e-24a5023f5c14",
          money: { amount: 10, currency: "EUR" },
          status: "HOLD",
          type: "bet",
          updatedAt: "2019-08-08T13:05:56.035Z"
        }
      ],
      currentPage: 33,
      hasMore: true,
      pageSize: 25
    };

    const state = listReducer(initialState, loadListSuccess({ list }));

    expect(state.list).toBe(list.data);
    expect(state.currentPage).toBe(list.currentPage);
    expect(state.pageSize).toBe(list.pageSize);
    expect(state.hasMore).toBe(list.hasMore);
    expect(state.loading).toBe(false);
  });

  it("should be save error", () => {
    const httpErrorResponse: any = {
      error: { error: "You don't have permissions for this route" }
    };

    const state = listReducer(
      initialState,
      loadListFailed({ error: httpErrorResponse })
    );

    expect(state.error).toBe(httpErrorResponse);
  });
});
