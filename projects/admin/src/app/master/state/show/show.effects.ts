import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { notificationError } from "../../../core/notification/notification.actions";
import { parseError } from "src/app/common/models";

import {
  loadMaster,
  loadMasterFailed,
  loadMasterSuccess
} from "./show.actions";
import { MasterService } from "../../master.service";

@Injectable()
export class ShowEffects {
  @Effect()
  loadMaster$: Observable<Action> = this.actions$.pipe(
    ofType(loadMaster),
    mergeMap(({ masterId }) =>
      this.service.fetchMaster(masterId).pipe(
        map(data => loadMasterSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Master cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadMasterFailed()
          ]);
        })
      )
    )
  );

  constructor(private service: MasterService, private actions$: Actions) {}
}
