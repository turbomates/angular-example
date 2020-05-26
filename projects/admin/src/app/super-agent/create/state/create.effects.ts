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

import { SuperAgentService } from "../../super-agent.service";
import { submit, submitSuccess, submitFailed } from "./create.actions";

@Injectable()
export class CreateEffects {
  @Effect()
  submit$ = this.actions$.pipe(
    ofType(submit),
    mergeMap(payload =>
      this.service.createAgent(payload.body).pipe(
        map(() => submitSuccess()),
        catchError(error => {
          return from([
            notificationError({ message: "Cannot be create super agent" }),
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
      return notificationSuccess({ message: "Success create super agent" });
    })
  );

  constructor(private service: SuperAgentService, private actions$: Actions) {}
}
