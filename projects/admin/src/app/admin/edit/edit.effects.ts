import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of, Observable } from "rxjs";
import { map, catchError, tap, mergeMap } from "rxjs/operators";

import { Choice, parseErrors } from "src/app/common/models";
import { AdminService } from "../admin.service";

import {
  loadActivities,
  loadActivitiesSuccess,
  loadActivitiesFailed,
  submit,
  submitFailed,
  loadAdmin,
  loadAdminSuccess,
  loadAdminFailed
} from "./edit.actions";
import { notificationSuccess } from "../../core/notification/notification.actions";

@Injectable()
export class EditEffects {
  @Effect()
  loadAdmin$: Observable<Action> = this.actions$.pipe(
    ofType(loadAdmin),
    mergeMap(({ id }) =>
      this.service.fetchAdmin(id).pipe(
        map(admin => loadAdminSuccess({ admin })),
        catchError(() => of(loadAdminFailed()))
      )
    )
  );

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
    mergeMap(({ adminId, body }) =>
      this.service.editAdmin(adminId, body).pipe(
        map(() => notificationSuccess({ message: "Success edit admin" })),
        catchError(err =>
          of(submitFailed({ errors: parseErrors(err.error.errors) }))
        )
      )
    )
  );

  constructor(private service: AdminService, private actions$: Actions) {}
}
