import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";

import { loadList } from "./state/list.actions";
import { getList } from "./state/list.selectors";
import { ListState } from "./list.models";

@Component({
  selector: "admin-achievement-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit {
  list$ = this.store.select(getList);

  constructor(private store: Store<ListState>) {}

  ngOnInit() {
    this.store.dispatch(loadList());
  }
}
