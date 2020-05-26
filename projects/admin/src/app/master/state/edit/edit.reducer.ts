import { createReducer, on } from "@ngrx/store";
import {
  loadMasterSuccess,
  reset,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { Master } from "../../master.model";
import { EditFormErrors } from "./edit.model";

export interface EditFormState {
  master: Master | null;
  isSubmitting: boolean;
  errors: EditFormErrors;
}

export const editFeatureKey = "editForm";

export const editInitialState: EditFormState = {
  master: null,
  isSubmitting: false,
  errors: {}
};

export const editReducer = createReducer(
  editInitialState,

  // loadSuperAgent
  on(loadMasterSuccess, (state, { data }) => ({
    ...state,
    master: data
  })),

  // Submit form
  on(submit, state => ({
    ...state,
    isSubmitting: true
  })),
  on(submitSuccess, state => ({
    ...state,
    isSubmitting: false
  })),
  on(submitFailed, (state, payload) => ({
    ...state,
    isSubmitting: false,
    errors: payload.errors
  })),

  // Clear state
  on(reset, () => editInitialState)
);
