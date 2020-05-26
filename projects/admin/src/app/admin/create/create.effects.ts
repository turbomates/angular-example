import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of, Observable } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { Choice, parseErrors } from "src/app/common/models";
import { notificationSuccess } from "../../core/notification/notification.actions";

import { AdminService } from "../admin.service";
import {
  loadActivities,
  loadActivitiesSuccess,
  loadActivitiesFailed,
  submit,
  submitFailed
} from "./create.actions";

@Injectable()
export class CreateEffects {
  @Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
    ofType(loadActivities),
    mergeMap(() =>
      this.service.fetchActivities().pipe(
        map(activities =>
          activities.map(
            activity =>
              ({
                label: activity,
                value: activity
              } as Choice)
          )
        ),
        map(activityChoices => loadActivitiesSuccess({ activityChoices })),
        catchError(() => of(loadActivitiesFailed()))
      )
    )
  );

  @Effect()
  submit$ = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload =>
      this.service.createAdmin(payload.body).pipe(
        map(() => notificationSuccess({ message: "Success create admin" })),
        catchError(err =>
          of(submitFailed({ errors: parseErrors(err.error.errors) }))
        )
      )
    )
  );

  constructor(private service: AdminService, private actions$: Actions) {}
}
