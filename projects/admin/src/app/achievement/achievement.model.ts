export interface AchievementGroup {
  id: string;
  name: string;
  priority: string;
  show: boolean;
}

export interface AchievementBaseResponse {
  badge: string;
  description: string;
  enabled: boolean;
  fee: number;
  groupId: string;
  id: string;
  rank: number;
  repeatable: boolean;
  title: string;
  condition: Condition;
  type: AchievementType;
}

interface BetsAchievementResponse extends AchievementBaseResponse {
  type: "bets";
  condition: Count;
}

interface PointsAchievementResponse extends AchievementBaseResponse {
  type: "points";
  condition: Amount;
}

interface WinBetsRowAchievementResponse extends AchievementBaseResponse {
  type: "win_bets_row";
  condition: Count;
}

interface OpenedAchievementsAchievementResponse
  extends AchievementBaseResponse {
  type: "opened_achievements";
  condition: Count;
}

export type AchievementResponse =
  | BetsAchievementResponse
  | PointsAchievementResponse
  | WinBetsRowAchievementResponse
  | OpenedAchievementsAchievementResponse;

export type AchievementType =
  | "bets"
  | "points"
  | "win_bets_row"
  | "opened_achievements";

export interface Count {
  count: number;
}

export interface Amount {
  amount: number;
}

export type Condition = Count | Amount;
