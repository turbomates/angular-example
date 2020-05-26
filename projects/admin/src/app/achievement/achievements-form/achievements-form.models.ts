import { BetsFormValueModel } from "./bets/bets.model";
import { PointsFormValueModel } from "./points/points.model";
import { OpenedAchievementsFormValueModel } from "./opened-achievements/opened-achievements.model";
import { WinBetsRowFormValueModel } from "./win-bets-row/win-bets-row.model";
import { Amount, Count } from "../achievement.model";

export interface BaseForm {
  groupId: string;
  badge?: string | null;
  description: string;
  enabled: boolean;
  fee: number;
  rank: number;
  repeatable: boolean;
  title: string;
}

export type FormValueModel =
  | BetsFormValueModel
  | PointsFormValueModel
  | OpenedAchievementsFormValueModel
  | WinBetsRowFormValueModel;

export interface BetsRequest extends BaseForm, ConditionBetsRequest {}

export interface PointsRequest extends BaseForm, ConditionPointsRequest {}

export interface OpenedAchievementsRequest
  extends BaseForm,
    ConditionOpenedAchievementsRequest {}

export interface WinBetsRowRequest
  extends BaseForm,
    ConditionWinBetsRowRequest {}

export type AchievementRequest =
  | BetsRequest
  | PointsRequest
  | OpenedAchievementsRequest
  | WinBetsRowRequest;

export type AchievementCondition =
  | ConditionBetsRequest
  | ConditionPointsRequest
  | ConditionOpenedAchievementsRequest
  | ConditionWinBetsRowRequest;

export interface ConditionBetsRequest {
  bets: Count;
}

export interface ConditionPointsRequest {
  points: Amount;
}

export interface ConditionOpenedAchievementsRequest {
  opened_achievements: Count;
}

export interface ConditionWinBetsRowRequest {
  win_bets_row: Count;
}
