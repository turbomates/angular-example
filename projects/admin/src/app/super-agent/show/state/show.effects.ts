import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { SuperAgentService } from "../../super-agent.service";
import {
  loadSuperAgent,
  loadSuperAgentFailed,
  loadSuperAgentSuccess
} from "./show.actions";

@Injectable()
export class ShowEffects {
  @Effect()
  loadSuperAgent$: Observable<Action> = this.actions$.pipe(
    ofType(loadSuperAgent),
    mergeMap(({ id }) =>
      this.service.fetchAgent(id).pipe(
        map(data => loadSuperAgentSuccess({ data })),
        catchError(error => {
          const parsedError = parseError(error, "Super agent cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadSuperAgentFailed()
          ]);
        })
      )
    )
  );

  constructor(private service: SuperAgentService, private actions$: Actions) {}
}
