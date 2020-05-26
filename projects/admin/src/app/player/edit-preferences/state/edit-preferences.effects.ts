import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError, parseErrors } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { PlayerService } from "../../player.service";
import {
  loadPlayer,
  loadPlayerFailed,
  loadPlayerSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-preferences.actions";

@Injectable()
export class EditPreferencesEffects {
  @Effect()
  loadPlayer$: Observable<Action> = this.actions$.pipe(
    ofType(loadPlayer),
    mergeMap(({ playerId }) =>
      this.service.fetchPlayer(playerId).pipe(
        map(data => loadPlayerSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Player cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadPlayerFailed()
          ]);
        })
      )
    )
  );

  @Effect()
  submit$: Observable<Action> = this.actions$.pipe(
    ofType(submit),
    mergeMap(({ playerId, body }) =>
      this.service.editPreferences(playerId, body).pipe(
        mergeMap(() =>
          from([
            submitSuccess(),
            notificationSuccess({ message: "Success edit preferences" })
          ])
        ),
        catchError(error => {
          return from([
            notificationError({ message: "Cannot be edit preferences" }),
            submitFailed({ error: parseErrors(error.error.errors) })
          ]);
        })
      )
    )
  );

  constructor(private service: PlayerService, private actions$: Actions) {}
}
