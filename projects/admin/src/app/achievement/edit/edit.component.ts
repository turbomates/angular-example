import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";

import { EditFormState } from "./edit.model";
import {
  deleteAchievement,
  loadAchievement,
  reset,
  submit
} from "./state/edit.actions";
import {
  getData,
  getFormErrors,
  getIsSubmitting
} from "./state/edit.selectors";
import { AchievementRequest } from "../achievements-form/achievements-form.models";

@Component({
  selector: "admin-achievement-edit",
  templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit, OnDestroy {
  isSubmitting$ = this.store.select(getIsSubmitting);
  formErrors$ = this.store.select(getFormErrors);
  data$ = this.store.select(getData);

  private achievementId: string;

  constructor(
    private store: Store<EditFormState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.achievementId = this.route.snapshot.params["id"];
    this.store.dispatch(loadAchievement({ id: this.achievementId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  public onSubmit(body: AchievementRequest) {
    this.store.dispatch(submit({ id: this.achievementId, body }));
  }

  public onDelete() {
    this.store.dispatch(deleteAchievement({ id: this.achievementId }));
  }
}
