import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../core/notification/notification.actions";

import { StreakService } from "./streak.service";
import { loadList, loadListFailed, loadListSuccess } from "./streak.actions";

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(loadList),
    mergeMap(({ params }) =>
      this.service.fetchStreakBets(params).pipe(
        map(list => loadListSuccess({ list })),
        catchError(error => {
          const parsedError = parseError(error, "Bets cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadListFailed({ error: parsedError })
          ]);
        })
      )
    )
  );

  constructor(private service: StreakService, private actions$: Actions) {}
}
