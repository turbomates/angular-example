import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { getUser } from "../user/user.selectors";
import { Activity } from "./permission.model";
import { UserState } from "../user/user.model";

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  private activities: Activity[] = [];
  private user$ = this.store.select(getUser);

  constructor(private store: Store<UserState>) {
    this.user$.subscribe(user => {
      this.activities = user.activities;
    });
  }

  public hasAccess(activity: Activity) {
    return this.activities.some(a => a === activity);
  }
}
