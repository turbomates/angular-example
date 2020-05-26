import "@angular/core/testing";

import { ListResponse } from "src/app/common/models";

import {
  updateCurrentPage,
  updatePageSize,
  loadList,
  loadListSuccess,
  loadListFailed
} from "./list.actions";
import { Master } from "../../master.model";
import { listInitialState, listReducer } from "./list.reducer";

describe("Master list reducer", () => {
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

  it("should be save loading status", () => {
    const state = listReducer(
      listInitialState,
      loadList({ params: { currentPage: 25, pageSize: 60 } })
    );

    expect(state.isLoading).toBe(true);
  });

  it("should be save list after list loading", () => {
    const list: ListResponse<Master> = {
      data: [
        {
          currency: "currency",
          email: "email",
          firstName: "firstName",
          id: "id",
          lastName: "lastName",
          locale: "locale",
          phone: "phone",
          username: "username"
        }
      ],
      currentPage: 33,
      hasMore: true,
      pageSize: 25
    };

    const state = listReducer(
      listInitialState,
      loadListSuccess({ data: list })
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
