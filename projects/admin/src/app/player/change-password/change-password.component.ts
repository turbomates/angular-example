import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ChangePasswordState } from "./change-password.model";
import { reset, submit } from "./state/change-password.actions";
import { getError, getIsSubmitting } from "./state/change-password.selectors";

@Component({
  selector: "admin-player-change-password",
  templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;

  errors$ = this.store.select(getError);
  isSubmitting$ = this.store.select(getIsSubmitting);

  private playerId: string;

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
    this.playerId = this.route.snapshot.params["id"];
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  onSubmit() {
    this.store.dispatch(
      submit({
        playerId: this.playerId,
        body: this.changePasswordForm.value
      })
    );
  }
}
