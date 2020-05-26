import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import {
  listFeatureKey,
  listInitialState,
  listReducer,
  ListState
} from "./list/list.reducer";
import { ListEffects } from "./list/list.effects";

export const lotteryFeatureKey = "lottery";

export interface LotteryState {
  [listFeatureKey]: ListState;
}

export const reducers: ActionReducerMap<LotteryState> = {
  [listFeatureKey]: listReducer
};

export const initialState = {
  [listFeatureKey]: listInitialState
};

export const getLotteryState = createFeatureSelector<LotteryState>(
  lotteryFeatureKey
);

export const effects = [ListEffects];
