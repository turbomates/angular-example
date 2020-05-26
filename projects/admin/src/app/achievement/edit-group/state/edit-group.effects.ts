import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { parseError, parseErrors } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import {
  loadAchievement,
  loadAchievementFailed,
  loadAchievementSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-group.actions";
import { AchievementService } from "../../achievement.service";
import { EditGroupFormData, EditGroupRequest } from "../edit-group.model";

@Injectable()
export class EditGroupEffects {
  @Effect()
  loadAchievement$: Observable<Action> = this.actions$.pipe(
    ofType(loadAchievement),
    mergeMap(({ id }) =>
      this.service.fetchAchievementGroup(id).pipe(
        map(data => loadAchievementSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(
            error,
            "Achievement group cannot be loaded"
          );

          return from([
            notificationError({ message: parsedError.message }),
            loadAchievementFailed()
          ]);
        })
      )
    )
  );

  @Effect()
  submit$ = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload =>
      this.service
        .editAchievementGroup(payload.id, this.serializeFormData(payload.body))
        .pipe(
          map(() => submitSuccess()),
          catchError(error => {
            return from([
              notificationError({
                message: "Cannot be edit achievement group"
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
    map(() =>
      notificationSuccess({ message: "Success edit achievement group" })
    )
  );

  constructor(private service: AchievementService, private actions$: Actions) {}

  private serializeFormData(data: EditGroupFormData): EditGroupRequest {
    return {
      ...data,
      priority: `${data.priority}`
    };
  }
}
