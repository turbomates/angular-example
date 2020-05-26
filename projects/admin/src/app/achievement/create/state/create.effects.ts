import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

import { parseErrors } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { submit, submitSuccess, submitFailed } from "./create.actions";
import { AchievementService } from "../../achievement.service";

@Injectable()
export class CreateEffects {
  @Effect()
  submit$: Observable<Action> = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload => {
      return this.service.createAchievement(payload.body).pipe(
        mergeMap(() =>
          from([
            submitSuccess(),
            notificationSuccess({ message: "Success create achievement" })
          ])
        ),
        catchError(error => {
          return from([
            notificationError({ message: "Cannot be create achievement" }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      );
    })
  );

  constructor(private service: AchievementService, private actions$: Actions) {}
}
