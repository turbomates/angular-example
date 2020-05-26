import { createReducer, on } from "@ngrx/store";

import { Error } from "src/app/common/models";

import {
  loadList,
  loadListFailed,
  loadListSuccess,
  updateCurrentPage,
  updatePageSize
} from "./list.actions";
import { Master } from "../../master.model";

export interface ListState {
  data: Master[];
  currentPage: number;
  hasMore: boolean;
  pageSize: number;
  isLoading: boolean;
  error: Error | null;
}

export const listFeatureKey = "ListMaster";

export const listInitialState: ListState = {
  data: [],
  currentPage: 1,
  pageSize: 20,
  hasMore: false,
  isLoading: false,
  error: null
};

export const listReducer = createReducer(
  listInitialState,

  // Change pagination
  on(updateCurrentPage, (state, { currentPage }) => ({
    ...state,
    currentPage
  })),
  on(updatePageSize, (state, { pageSize }) => ({ ...state, pageSize })),

  // Load List
  on(loadList, state => ({
    ...state,
    isLoading: true
  })),
  on(loadListSuccess, (state, { data }) => ({
    ...state,
    data: data.data,
    currentPage: data.currentPage,
    pageSize: data.pageSize,
    hasMore: data.hasMore,
    isLoading: false
  })),
  on(loadListFailed, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
);
