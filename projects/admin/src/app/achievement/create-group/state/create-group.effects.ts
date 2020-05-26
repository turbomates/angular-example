import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { parseErrors } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { submit, submitSuccess, submitFailed } from "./create-group.actions";
import { AchievementService } from "../../achievement.service";

@Injectable()
export class CreateGroupEffects {
  @Effect()
  submit$ = this.actions$.pipe(
    ofType(submit),
    mergeMap(({ body }) =>
      this.service.createAchievementGroup(body).pipe(
        map(() => submitSuccess()),
        catchError(error => {
          return from([
            notificationError({
              message: "Cannot be create group achievement"
            }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  @Effect()
  submitSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(submitSuccess),
    map(() => {
      return notificationSuccess({
        message: "Success create group achievement"
      });
    })
  );

  constructor(private service: AchievementService, private actions$: Actions) {}
}
