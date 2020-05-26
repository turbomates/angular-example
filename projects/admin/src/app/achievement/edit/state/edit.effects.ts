import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { map, catchError, mergeMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { parseError, parseErrors } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import {
  deleteAchievement,
  deleteAchievementFailed,
  deleteAchievementSuccess,
  loadAchievement,
  loadAchievementFailed,
  loadAchievementSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { AchievementService } from "../../achievement.service";

@Injectable()
export class EditEffects {
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

  @Effect()
  submit$: Observable<Action> = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload => {
      return this.service.editAchievement(payload.id, payload.body).pipe(
        mergeMap(() =>
          from([
            submitSuccess(),
            notificationSuccess({ message: "Success edit achievement" })
          ])
        ),
        catchError(error => {
          return from([
            notificationError({ message: "Cannot be edit achievement" }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      );
    })
  );

  @Effect()
  deleteAchievement$: Observable<Action> = this.actions$.pipe(
    ofType(deleteAchievement),
    mergeMap(payload =>
      this.service.deleteAchievement(payload.id).pipe(
        mergeMap(() =>
          from([
            deleteAchievementSuccess(),
            notificationSuccess({ message: "Success delete achievement" })
          ])
        ),
        catchError(() => {
          return from([
            deleteAchievementFailed(),
            notificationError({ message: "Cannot be delete achievement" })
          ]);
        })
      )
    )
  );

  @Effect({ dispatch: false })
  deleteAchievementSuccess$ = this.actions$.pipe(
    ofType(deleteAchievementSuccess),
    tap(() => {
      this.router.navigate(["/achievement"]);
    })
  );

  constructor(
    private service: AchievementService,
    private actions$: Actions,
    private router: Router
  ) {}
}
