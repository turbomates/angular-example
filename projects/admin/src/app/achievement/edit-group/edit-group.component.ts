import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { loadAchievement, reset, submit } from "./state/edit-group.actions";
import { EditGroupFormState } from "./edit-group.model";
import {
  getData,
  getFormErrors,
  getIsSubmitting
} from "./state/edit-group.selectors";
import { AchievementGroup } from "../achievement.model";

@Component({
  selector: "admin-achievement-edit-group",
  templateUrl: "./edit-group.component.html"
})
export class EditGroupComponent implements OnInit, OnDestroy {
  editGroupForm: FormGroup;

  isSubmitting$ = this.store.select(getIsSubmitting);
  formErrors$ = this.store.select(getFormErrors);
  data$ = this.store.select(getData);

  private achievementGroupId: string;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<EditGroupFormState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.achievementGroupId = this.route.snapshot.params["id"];
    this.store.dispatch(loadAchievement({ id: this.achievementGroupId }));

    this.subs.add(this.subscribeToAchievement());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.store.dispatch(
      submit({ id: this.achievementGroupId, body: this.editGroupForm.value })
    );
  }

  private subscribeToAchievement(): Subscription {
    return this.data$
      .pipe(
        filter(data => !!data),
        tap(data => {
          this.initForm(data);
        })
      )
      .subscribe();
  }

  private initForm(data: AchievementGroup) {
    this.editGroupForm = this.fb.group({
      name: [data.name, Validators.required],
      priority: [data.priority, Validators.required],
      show: [data.show]
    });
  }
}
