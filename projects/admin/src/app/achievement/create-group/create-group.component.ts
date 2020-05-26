import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { getFormErrors, getIsSubmitting } from "./state/create-group.selectors";
import { CreateGroupFormState } from "./create-group.model";
import { reset, submit } from "./state/create-group.actions";

@Component({
  selector: "admin-achievement-create-group",
  templateUrl: "./create-group.component.html"
})
export class CreateGroupComponent implements OnDestroy {
  createGroupForm: FormGroup;

  isSubmitting$ = this.store.select(getIsSubmitting);
  formErrors$ = this.store.select(getFormErrors);

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateGroupFormState>
  ) {
    this.createGroupForm = this.fb.group({
      name: ["", Validators.required],
      priority: ["", Validators.required],
      show: [false]
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  public onSubmit() {
    this.store.dispatch(submit({ body: this.createGroupForm.value }));
  }
}
