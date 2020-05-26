import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

import { Choice } from "src/app/common/models";
import { CreateFormState } from "../admin.model";

import { submit, loadActivities, loadAdmin, reset } from "./edit.actions";
import { getActivityChoices, getFormErrors, getAdmin } from "./edit.selectors";

@Component({
  selector: "admin-admins-edit",
  templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit, OnDestroy {
  public editForm: FormGroup | null = null;
  public activityChoices: Choice[] = [];

  public formErrors$ = this.store.select(getFormErrors);

  private subs = new Subscription();
  private adminsId: string | null = null;

  private adminData$ = this.store.select(getAdmin);
  private activityChoices$ = this.store.select(getActivityChoices);

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateFormState>,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      activities: [[]],
      isSuper: [false]
    });
  }

  ngOnInit(): void {
    this.adminsId = this.route.snapshot.params["id"];

    this.store.dispatch(loadActivities());
    this.store.dispatch(loadAdmin({ id: this.adminsId }));

    this.subs
      .add(this.subscribeToActivityChoices())
      .add(this.subscribeToAdmin());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(reset());
  }

  public onSubmit() {
    this.store.dispatch(
      submit({
        adminId: this.adminsId,
        body: {
          ...this.editForm.value,
          activities: this.editForm.value.isSuper
            ? this.activityChoices.map(choice => choice.value)
            : this.editForm.value.activities
        }
      })
    );
  }

  private subscribeToActivityChoices(): Subscription {
    return this.activityChoices$.subscribe(activityChoices => {
      this.activityChoices = activityChoices;
    });
  }

  private subscribeToAdmin(): Subscription {
    return this.adminData$
      .pipe(filter(admin => admin !== null))
      .subscribe(admin => {
        this.editForm.setValue({
          lastName: admin.lastName,
          firstName: admin.firstName,
          activities: admin.activities,
          isSuper: this.activityChoices.length === admin.activities.length
        });
      });
  }
}
