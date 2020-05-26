import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of, Observable } from "rxjs";
import { map, catchError, mergeMap, tap } from "rxjs/operators";

import { parseErrors } from "src/app/common/models";

import {
  loadUser,
  loadUserSuccess,
  loadUserFailed,
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  clear
} from "./user.actions";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(loadUser),
    mergeMap(() =>
      this.service.loadUser().pipe(
        map(user => loadUserSuccess({ user })),
        catchError(() => of(loadUserFailed()))
      )
    )
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(login),
    mergeMap(({ body }) =>
      this.service.login(body).pipe(
        map(() => loginSuccess()),
        catchError(err =>
          of(loginFailed({ errors: parseErrors(err.error.errors) }))
        )
      )
    )
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(logout),
    mergeMap(() =>
      this.service.logout().pipe(
        map(() => logoutSuccess()),
        catchError(() => of(logoutSuccess()))
      )
    )
  );

  @Effect()
  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(loginSuccess),
    tap(() => {
      this.router.navigateByUrl("/");
    }),
    map(() => loadUser())
  );

  @Effect()
  logoutSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(logoutSuccess),
    tap(() => {
      this.router.navigateByUrl("/login");
    }),
    map(() => clear())
  );

  constructor(
    private service: UserService,
    private actions$: Actions,
    private router: Router
  ) {}
}
