import { Actions, Effect, ofType } from "@ngrx/effects";
import { from, Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { loadList, loadListFailed, loadListSuccess } from "./list.actions";
import { MasterService } from "../../master.service";

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(loadList),
    mergeMap(({ params }) =>
      this.service.fetchMasters(params).pipe(
        map(data => loadListSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Master cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadListFailed({
              error: parsedError
            })
          ]);
        })
      )
    )
  );

  constructor(private actions$: Actions, private service: MasterService) {}
}
