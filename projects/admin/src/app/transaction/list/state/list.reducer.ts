import { createReducer, on, Action } from "@ngrx/store";

import {
  updateCurrentPage,
  updatePageSize,
  loadList,
  loadListSuccess,
  loadListFailed
} from "./list.actions";
import { ListState } from "./list.model";

export const listFeatureKey = "listTransaction";

export const initialState: ListState = {
  list: [],
  currentPage: 1,
  pageSize: 20,
  hasMore: false,
  loading: false,
  error: null
};

const reducer = createReducer(
  initialState,

  // Change pagination
  on(updateCurrentPage, (state, { currentPage }) => ({
    ...state,
    currentPage
  })),
  on(updatePageSize, (state, { pageSize }) => ({ ...state, pageSize })),

  // Load List
  on(loadList, state => ({ ...state, loading: true })),
  on(loadListSuccess, (state, { list }) => ({
    ...state,
    list: list.data,
    currentPage: list.currentPage,
    pageSize: list.pageSize,
    hasMore: list.hasMore,
    loading: false
  })),
  on(loadListFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

export function listReducer(state: ListState, action: Action) {
  return reducer(state, action);
}
