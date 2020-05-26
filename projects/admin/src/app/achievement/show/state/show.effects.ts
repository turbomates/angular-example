import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { notificationError } from "../../../core/notification/notification.actions";
import { parseError } from "src/app/common/models";

import { AchievementService } from "../../achievement.service";
import {
  loadAchievement,
  loadAchievementFailed,
  loadAchievementSuccess
} from "./show.actions";

@Injectable()
export class ShowEffects {
  @Effect()
  loadAchievement$: Observable<Action> = this.actions$.pipe(
    ofType(loadAchievement),
    mergeMap(({ id }) =>
      this.service.fetchAchievement(id).pipe(
        map(data => loadAchievementSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Achievement cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadAchievementFailed()
          ]);
        })
      )
    )
  );

  constructor(private service: AchievementService, private actions$: Actions) {}
}
