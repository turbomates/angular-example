import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { ShowState } from "../state/show/show.reducer";
import { loadMaster, reset } from "../state/show/show.actions";
import { getData } from "../state/show/show.selectors";

@Component({
  selector: "admin-master-show",
  templateUrl: "./show.component.html"
})
export class ShowComponent implements OnInit, OnDestroy {
  masterData$ = this.store.select(getData);

  constructor(private route: ActivatedRoute, private store: Store<ShowState>) {}

  ngOnInit() {
    const masterId = this.route.snapshot.params["id"];
    this.store.dispatch(loadMaster({ masterId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }
}
