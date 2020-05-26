import { ShowResponse } from "src/app/common/models";

import { AchievementResponse, AchievementGroup } from "../achievement.model";

export type AchievementGroupList = ShowResponse<AchievementGroup[]>;

export type AchievementList = ShowResponse<AchievementResponse[]>;

export class GroupedAchievement {
  private _achievements: AchievementResponse[] = [];

  constructor(private group: AchievementGroup) {}

  public get id() {
    return this.group.id;
  }

  public get name() {
    return this.group.name;
  }

  public get priority() {
    return this.group.priority;
  }

  public get show() {
    return this.group.show;
  }

  public get achievements() {
    return this._achievements.slice();
  }

  public addAchievement(achievement: AchievementResponse) {
    this._achievements.push(achievement);
  }
}

export interface ListState {
  list: GroupedAchievement[];
}
