import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Observable, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { loadList, loadListSuccess, loadListFailed } from "./list.actions";
import { AchievementService } from "../../achievement.service";

@Injectable()
export class ListEffects {
  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType(loadList),
    mergeMap(() =>
      this.service.fetchGroupedList().pipe(
        map(list => loadListSuccess({ list })),
        catchError(error => {
          const parsedError = parseError(error, "Achievement cannot be loaded");

          return from([
            notificationError({ message: parsedError.message }),
            loadListFailed({ error: parsedError })
          ]);
        })
      )
    )
  );

  constructor(private service: AchievementService, private actions$: Actions) {}
}
