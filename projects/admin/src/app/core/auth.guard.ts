import { Injectable } from "@angular/core";
import { Router, UrlTree, CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { skipWhile, map, tap } from "rxjs/operators";

import { UserState } from "./user/user.model";
import { getIsAuthenticated } from "./user/user.selectors";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<UserState>, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(getIsAuthenticated).pipe(
      skipWhile(auth => auth === null),
      map(auth => (auth ? true : this.router.createUrlTree(["login"])))
    );
  }
}
