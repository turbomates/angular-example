import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { ChangePasswordState } from "../admin.model";
import { getError, getIsSubmitting } from "./state/change-password.selectors";
import { reset, submit } from "./state/change-password.actions";

@Component({
  selector: "admin-admins-change-password",
  templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;

  errors$ = this.store.select(getError);
  isSubmitting$ = this.store.select(getIsSubmitting);

  private adminId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<ChangePasswordState>
  ) {
    this.changePasswordForm = this.fb.group({
      newPassword: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.adminId = this.route.snapshot.params["id"];
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  onSubmit() {
    this.store.dispatch(
      submit({
        adminId: this.adminId,
        body: this.changePasswordForm.value
      })
    );
  }
}
