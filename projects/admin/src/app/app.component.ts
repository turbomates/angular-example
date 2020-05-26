import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { loadUser } from "./core/user/user.actions";
import { UserState } from "./core/user/user.model";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());
  }
}
