import { Store } from "@ngrx/store";
import { Component } from "@angular/core";

import { logout } from "../core/user/user.actions";
import { UserState } from "../core/user/user.model";

@Component({
  selector: "admin-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  public isCollapsed = false;
  public visible = false;

  constructor(private store: Store<UserState>) {}

  public logout() {
    this.store.dispatch(logout());
  }

  public toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.visible = !this.visible;
  }
}
