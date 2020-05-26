import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { PlayerService } from "../../player.service";
import {
  loadPlayer,
  loadPlayerSuccess,
  loadPlayerFailed
} from "./show.actions";

@Injectable()
export class ShowEffects {
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

  constructor(private service: PlayerService, private actions$: Actions) {}
}
