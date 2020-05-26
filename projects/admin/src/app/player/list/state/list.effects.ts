import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { loadList, loadListSuccess, loadListFailed } from "./list.actions";
import { PlayerService } from "../../player.service";

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(loadList),
    mergeMap(({ params }) =>
      this.service.fetchPlayers(params).pipe(
        map(list => loadListSuccess({ list })),
        catchError(error => {
          const parsedError = parseError(error, "Players cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadListFailed({ error: parsedError })
          ]);
        })
      )
    )
  );

  constructor(private service: PlayerService, private actions$: Actions) {}
}
