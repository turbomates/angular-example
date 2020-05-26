import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { loadSuperAgent } from "./state/show.actions";
import { ShowState } from "./show.model";
import { getData } from "./state/show.selectors";

@Component({
  selector: "admin-super-agent-show",
  templateUrl: "./show.component.html"
})
export class ShowComponent implements OnInit {
  data$ = this.store.select(getData);

  private superAgentId: string;

  constructor(private route: ActivatedRoute, private store: Store<ShowState>) {}

  ngOnInit() {
    this.superAgentId = this.route.snapshot.params["id"];
    this.store.dispatch(loadSuperAgent({ id: this.superAgentId }));
  }
}
