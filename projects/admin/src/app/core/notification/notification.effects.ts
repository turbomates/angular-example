import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { NzNotificationService } from "ng-zorro-antd";

import { notificationError, notificationSuccess } from "./notification.actions";

@Injectable()
export class NotificationEffects {
  @Effect({ dispatch: false })
  notificationSuccess$ = this.actions$.pipe(
    ofType(notificationSuccess),
    tap(({ message }) => {
      return this.notification.success("Success", message, {
        nzStyle: {
          background: "#f6ffed",
          border: "1px solid #b7eb8f"
        }
      });
    })
  );

  @Effect({ dispatch: false })
  notificationError$ = this.actions$.pipe(
    ofType(notificationError),
    tap(({ message }) => {
      return this.notification.error("Error", message, {
        nzStyle: {
          background: "#fff1f0",
          border: "1px solid #ffa39e"
        }
      });
    })
  );

  constructor(
    private actions$: Actions,
    private notification: NzNotificationService
  ) {
    this.notification.config({
      nzPlacement: "bottomRight"
    });
  }
}
