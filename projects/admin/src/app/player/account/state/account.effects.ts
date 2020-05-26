import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError, parseErrors } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { PlayerService } from "../../player.service";
import {
  loadAccount,
  loadAccountSuccess,
  submitSendAccountMoney,
  submitTakeAccountMoney,
  loadAccountFailed,
  submitFailed,
  submitSuccess
} from "./account.actions";

@Injectable()
export class AccountEffects {
  @Effect()
  loadAccount$: Observable<Action> = this.actions$.pipe(
    ofType(loadAccount),
    mergeMap(({ playerId }) =>
      this.service.fetchAccounts(playerId).pipe(
        map(data => loadAccountSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Account cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadAccountFailed()
          ]);
        })
      )
    )
  );

  @Effect()
  takeAccountMoney$: Observable<Action> = this.actions$.pipe(
    ofType(submitTakeAccountMoney),
    mergeMap(({ accountMoney, accountId, playerId }) =>
      this.service.takeAccountMoney(accountId, accountMoney).pipe(
        mergeMap(() => {
          return [
            notificationSuccess({ message: "Money has been taken" }),
            submitSuccess({ playerId })
          ];
        }),
        catchError(error => {
          const errorMessage = "Money cannot be taken";

          return from([
            notificationError({ message: errorMessage }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  @Effect()
  sendAccountMoney$ = this.actions$.pipe(
    ofType(submitSendAccountMoney),
    mergeMap(({ accountMoney, accountId, playerId }) =>
      this.service.sendAccountMoney(accountId, accountMoney).pipe(
        mergeMap(() => {
          return [
            notificationSuccess({ message: "Money has been sent" }),
            submitSuccess({ playerId })
          ];
        }),
        catchError(error => {
          const errorMessage = "Money cannot be sent";
          return from([
            notificationError({ message: errorMessage }),
            submitFailed({ errors: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  @Effect()
  submitSuccess$ = this.actions$.pipe(
    ofType(submitSuccess),
    map(({ playerId }) => {
      return loadAccount({ playerId });
    }),
    catchError(() => of({}))
  );

  constructor(private service: PlayerService, private actions$: Actions) {}
}
