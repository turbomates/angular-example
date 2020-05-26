import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import {
  listFeatureKey,
  listInitialState,
  listReducer,
  ListState
} from "./list/list.reducer";
import { ListEffects } from "./list/list.effects";
import {
  editFeatureKey,
  EditFormState,
  editInitialState,
  editReducer
} from "./edit/edit.reducer";
import { EditEffects } from "./edit/edit.effects";
import {
  showFeatureKey,
  showInitialState,
  showReducer,
  ShowState
} from "./show/show.reducer";
import { ShowEffects } from "./show/show.effects";

export const masterFeatureKey = "master";

export interface MasterState {
  [listFeatureKey]: ListState;
  [editFeatureKey]: EditFormState;
  [showFeatureKey]: ShowState;
}

export const reducers: ActionReducerMap<MasterState> = {
  [listFeatureKey]: listReducer,
  [editFeatureKey]: editReducer,
  [showFeatureKey]: showReducer
};

export const initialState = {
  [listFeatureKey]: listInitialState,
  [editFeatureKey]: editInitialState,
  [showFeatureKey]: showInitialState
};

export const getMasterState = createFeatureSelector<MasterState>(
  masterFeatureKey
);

export const effects = [ListEffects, EditEffects, ShowEffects];
