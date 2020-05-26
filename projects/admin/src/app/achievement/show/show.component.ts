import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { getData } from "./state/show.selectors";
import { ShowState } from "./show.model";
import { loadAchievement, reset } from "./state/show.actions";

@Component({
  selector: "admin-achievement-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"]
})
export class ShowComponent implements OnInit, OnDestroy {
  data$ = this.store.select(getData);

  private achievementId: string;

  constructor(private route: ActivatedRoute, private store: Store<ShowState>) {}

  ngOnInit() {
    this.achievementId = this.route.snapshot.params["achievementId"];
    this.store.dispatch(loadAchievement({ id: this.achievementId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }
}
