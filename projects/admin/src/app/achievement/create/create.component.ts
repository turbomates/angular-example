import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";

import { getFormErrors } from "./state/create.selectors";
import { reset, submit } from "./state/create.actions";
import { getIsSubmitting } from "./state/create.selectors";
import { CreateFormState } from "./create.model";
import { AchievementResponse } from "../achievement.model";
import { AchievementRequest } from "../achievements-form/achievements-form.models";

@Component({
  selector: "admin-achievement-create",
  templateUrl: "./create.component.html"
})
export class CreateComponent implements OnDestroy {
  public data: Partial<AchievementResponse>;
  public achievementId: string;
  public formErrors$ = this.store.select(getFormErrors);

  public isSubmitting$ = this.store.select(getIsSubmitting);

  constructor(
    private store: Store<CreateFormState>,
    private route: ActivatedRoute
  ) {
    this.achievementId = this.route.snapshot.params["groupId"];
    this.data = {
      badge: null,
      condition: { count: 1 },
      description: "",
      enabled: false,
      fee: 1,
      rank: 1,
      repeatable: false,
      title: "",
      type: "bets",
      groupId: this.achievementId
    };
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  public onSubmit(body: AchievementRequest) {
    this.store.dispatch(submit({ body }));
  }
}
