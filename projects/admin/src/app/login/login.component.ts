import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { login } from "../core/user/user.actions";
import { UserState } from "../core/user/user.model";
import { getLoginErrors, getIsSubmitting } from "../core/user/user.selectors";

@Component({
  selector: "admin-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup;

  public errors$ = this.store.select(getLoginErrors);
  public isSubmitting$ = this.store.select(getIsSubmitting);

  constructor(private fb: FormBuilder, private store: Store<UserState>) {}

  get serializedData() {
    return {
      password: this.authForm.value.password,
      username: this.authForm.value.username
    };
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmitForm() {
    this.store.dispatch(login({ body: this.serializedData }));
  }
}
