import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";

import {ShowResponse} from "src/app/common/models";

import {
  AchievementGroupList,
  AchievementList,
  GroupedAchievement
} from "./list/list.models";
import { AchievementResponse, AchievementGroup } from "./achievement.model";
import { EditGroupRequest } from "./edit-group/edit-group.model";
import { AchievementRequest } from "./achievements-form/achievements-form.models";
import { CreateGroupRequest } from "./create-group/create-group.model";

@Injectable()
export class AchievementService {
  constructor(private http: HttpClient) {}

  public deleteAchievement(achievementId: string) {
    return this.http.delete(`admin/achievements/${achievementId}`);
  }

  public fetchAchievement(
    achievementId: string
  ): Observable<AchievementResponse> {
    return this.http
      .get<ShowResponse<AchievementResponse>>(
        `admin/achievements/${achievementId}`
      )
      .pipe(map(achievementData => achievementData.data));
  }

  public editAchievement(achievementId: string, body: AchievementRequest) {
    return this.http.post(`admin/achievements/${achievementId}`, body);
  }

  public createAchievement(body: AchievementRequest) {
    return this.http.post(`admin/achievements`, body);
  }

  public fetchAchievementGroup(
    achievementId: string
  ): Observable<AchievementGroup> {
    return this.http
      .get<ShowResponse<AchievementGroup>>(
        `admin/achievements/groups/${achievementId}`
      )
      .pipe(map(achievementGroupData => achievementGroupData.data));
  }

  public editAchievementGroup(groupId: string, body: EditGroupRequest) {
    return this.http.post(`admin/achievements/groups/${groupId}`, body);
  }

  public createAchievementGroup(body: CreateGroupRequest) {
    return this.http.post(`admin/achievements/groups`, body);
  }

  public fetchGroupedList(): Observable<GroupedAchievement[]> {
    return forkJoin(this.fetchGroups(), this.fetchAchievements()).pipe(
      map(this.groupList)
    );
  }

  private groupList([groupedAchievement, allAchievements]: [
    GroupedAchievement[],
    AchievementResponse[]
  ]) {
    return allAchievements.reduce((groups, achievement) => {
      const group = groups.find(group => achievement.groupId === group.id);

      if (group) {
        group.addAchievement(achievement);
      }

      return groups;
    }, groupedAchievement);
  }

  private fetchAchievements(): Observable<AchievementResponse[]> {
    return this.http
      .get<AchievementList>(`admin/achievements`)
      .pipe(map(list => list.data));
  }

  private fetchGroups(): Observable<GroupedAchievement[]> {
    return this.http
      .get<AchievementGroupList>(`admin/achievements/groups`)
      .pipe(
        map(groupList =>
          groupList.data
            .map(group => new GroupedAchievement(group))
            .sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority))
        )
      );
  }
}
