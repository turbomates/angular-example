import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { ListLoadService } from "../list-load.service";
import { loadList, loadListSuccess, loadListFailed } from "./list.actions";

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(loadList),
    mergeMap(({ params }) =>
      this.service.fetchList(params).pipe(
        map(list => loadListSuccess({ list })),
        catchError(error => {
          const parsedError = parseError(
            error,
            "Transactions cannot be loaded"
          );

          return from([
            notificationError({ message: parsedError.message }),
            loadListFailed({ error: parsedError })
          ]);
        })
      )
    )
  );

  constructor(private service: ListLoadService, private actions$: Actions) {}
}
