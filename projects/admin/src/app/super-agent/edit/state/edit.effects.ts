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

import { SuperAgentService } from "../../super-agent.service";
import {
  loadSuperAgent,
  loadSuperAgentFailed,
  loadSuperAgentSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";

@Injectable()
export class EditEffects {
  @Effect()
  loadSuperAgent$: Observable<Action> = this.actions$.pipe(
    ofType(loadSuperAgent),
    mergeMap(({ id }) =>
      this.service.fetchAgent(id).pipe(
        map(data => loadSuperAgentSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Super agent cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadSuperAgentFailed()
          ]);
        })
      )
    )
  );

  @Effect()
  submit$ = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload =>
      this.service.editAgent(payload.id, payload.body).pipe(
        map(() => submitSuccess()),
        catchError(error => {
          return from([
            notificationError({ message: "Cannot be edit super agent" }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  @Effect()
  submitSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(submitSuccess),
    map(() => notificationSuccess({ message: "Success edit super agent" }))
  );

  constructor(private service: SuperAgentService, private actions$: Actions) {}
}
