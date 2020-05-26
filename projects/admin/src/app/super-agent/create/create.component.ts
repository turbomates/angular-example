import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { submit, reset } from "./state/create.actions";
import { CreateFormState } from "./create.model";
import { getFormErrors, getIsSubmitting } from "./state/create.selectors";

@Component({
  selector: "admin-super-agent-create",
  templateUrl: "./create.component.html"
})
export class CreateComponent implements OnDestroy {
  createForm: FormGroup;

  isSubmitting$ = this.store.select(getIsSubmitting);
  formErrors$ = this.store.select(getFormErrors);

  constructor(private fb: FormBuilder, private store: Store<CreateFormState>) {
    this.createForm = this.fb.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phone: [""],
      currency: ["", Validators.required],
      locale: ["", Validators.required],
      password: [
        "",
        Validators.compose([Validators.minLength(8), Validators.required])
      ]
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  public onSubmit() {
    this.store.dispatch(submit({ body: this.createForm.value }));
  }
}
