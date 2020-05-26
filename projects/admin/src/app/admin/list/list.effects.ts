import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { notificationError } from "../../core/notification/notification.actions";
import { parseError } from "src/app/common/models";

import { AdminService } from "../admin.service";
import { loadList, loadListSuccess, loadListFailed } from "./list.actions";

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(loadList),
    mergeMap(({ params }) =>
      this.service.fetchAdmins(params).pipe(
        map(list => loadListSuccess({ list })),
        catchError(error => {
          const parsedError = parseError(error, "Admins cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadListFailed({ error: parsedError })
          ]);
        })
      )
    )
  );

  constructor(private service: AdminService, private actions$: Actions) {}
}
