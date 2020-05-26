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
  loadMaster,
  loadMasterFailed,
  loadMasterSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { MasterService } from "../../master.service";

@Injectable()
export class EditEffects {
  @Effect()
  loadMaster$: Observable<Action> = this.actions$.pipe(
    ofType(loadMaster),
    mergeMap(({ id }) =>
      this.service.fetchMaster(id).pipe(
        map(data => loadMasterSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Master cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadMasterFailed()
          ]);
        })
      )
    )
  );

  @Effect()
  submit$: Observable<Action> = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload =>
      this.service.editMaster(payload.id, payload.body).pipe(
        mergeMap(() =>
          from([
            submitSuccess(),
            notificationSuccess({ message: "Success edit master" })
          ])
        ),
        catchError(error => {
          return from([
            notificationError({ message: "Cannot be edit master" }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  constructor(private service: MasterService, private actions$: Actions) {}
}
