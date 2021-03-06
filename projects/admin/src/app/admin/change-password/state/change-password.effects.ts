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

import { submit, submitFailed, submitSuccess } from "./change-password.actions";
import { AdminService } from "../../admin.service";

@Injectable()
export class ChangePasswordEffects {
  @Effect()
  submit$: Observable<Action> = this.actions$.pipe(
    ofType(submit),
    mergeMap(({ adminId, body }) =>
      this.service.changePasswordAdmin(adminId, body).pipe(
        mergeMap(() =>
          from([
            submitSuccess(),
            notificationSuccess({ message: "Password success change" })
          ])
        ),
        catchError(error => {
          return from([
            notificationError({ message: "Password cannot be change" }),
            submitFailed({ error: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  constructor(private service: AdminService, private actions$: Actions) {}
}
