import { createReducer, on } from "@ngrx/store";

import { Error } from "src/app/common/models";

import {
  loadList,
  loadListFailed,
  loadListSuccess,
  updateScope,
  updateCurrentPage,
  updatePageSize
} from "./list.actions";
import { Lottery } from "../../lottery.model";

export interface ListState {
  data: Lottery[];
  currentPage: number;
  hasMore: boolean;
  pageSize: number;
  type: string | null;
  isLoading: boolean;
  error: Error | null;
}

export const listFeatureKey = "List";

export const listInitialState: ListState = {
  data: [],
  currentPage: 1,
  pageSize: 20,
  hasMore: false,
  type: null,
  isLoading: false,
  error: null
};

export const listReducer = createReducer(
  listInitialState,

  // Change search params
  on(updateCurrentPage, (state, { currentPage }) => ({
    ...state,
    currentPage
  })),
  on(updatePageSize, (state, { pageSize }) => ({ ...state, pageSize })),

  on(updateScope, (state, { scopeType }) => ({
    ...state,
    type: scopeType,
    currentPage: 1
  })),

  // Load List
  on(loadList, state => ({
    ...state,
    isLoading: true
  })),
  on(loadListSuccess, (state, { data, params }) => ({
    ...state,
    data: data.data,
    currentPage: data.currentPage,
    pageSize: data.pageSize,
    hasMore: data.hasMore,
    isLoading: false,
    type: params.type
  })),
  on(loadListFailed, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
);
