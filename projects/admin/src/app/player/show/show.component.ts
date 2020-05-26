import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { ShowState } from "./show.model";
import { loadPlayer, reset } from "./state/show.actions";
import { getPlayer } from "./state/show.selectors";

@Component({
  selector: "admin-player-show",
  templateUrl: "./show.component.html"
})
export class ShowComponent implements OnInit, OnDestroy {
  playerData$ = this.store.select(getPlayer);

  private playerId: string;

  constructor(private route: ActivatedRoute, private store: Store<ShowState>) {}

  ngOnInit() {
    this.playerId = this.route.snapshot.params["id"];
    this.store.dispatch(loadPlayer({ playerId: this.playerId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }
}
