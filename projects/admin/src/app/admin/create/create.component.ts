import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { CreateFormState } from "../admin.model";

import { submit, loadActivities, reset } from "./create.actions";
import { getActivityChoices, getFormErrors } from "./create.selectors";

@Component({
  selector: "admin-admins-create",
  templateUrl: "./create.component.html"
})
export class CreateComponent implements OnInit, OnDestroy {
  public createForm: FormGroup;

  public formErrors$ = this.store.select(getFormErrors);
  public activityChoices$ = this.store.select(getActivityChoices);

  constructor(private fb: FormBuilder, private store: Store<CreateFormState>) {
    this.createForm = this.fb.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      username: ["", Validators.required],
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      password: [
        "",
        Validators.compose([Validators.minLength(8), Validators.required])
      ],
      activities: [[]],
      isSuper: [false]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  public onSubmit() {
    this.store.dispatch(submit({ body: this.createForm.value }));
  }
}
