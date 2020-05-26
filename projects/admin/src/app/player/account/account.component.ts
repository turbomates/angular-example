import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import {
  getAccount,
  getErrors,
  getIsSubmitting
} from "./state/account.selectors";
import {
  loadAccount,
  reset,
  submitSendAccountMoney,
  submitTakeAccountMoney
} from "./state/account.actions";
import { AccountState } from "./account.model";

@Component({
  selector: "admin-player-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit, OnDestroy {
  visibleTakeMoney = false;
  visibleSendMoney = false;
  formSend: FormGroup;
  formTake: FormGroup;

  accountData$ = this.store.select(getAccount);
  formErrors$ = this.store.select(getErrors);
  isSubmitting$ = this.store.select(getIsSubmitting);

  private playerId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AccountState>,
    private fb: FormBuilder
  ) {
    this.formTake = this.fb.group({
      amount: ["", Validators.required]
    });

    this.formSend = this.fb.group({
      amount: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.playerId = this.route.snapshot.params["id"];
    this.store.dispatch(loadAccount({ playerId: this.playerId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  closePopovers() {
    this.visibleTakeMoney = false;
    this.visibleSendMoney = false;
  }

  sendAccountMoney(accountId: string) {
    this.store.dispatch(
      submitSendAccountMoney({
        accountMoney: this.formSend.value,
        accountId,
        playerId: this.playerId
      })
    );

    this.closePopovers();
  }

  takeAccountMoney(accountId: string) {
    this.store.dispatch(
      submitTakeAccountMoney({
        accountMoney: this.formTake.value,
        accountId,
        playerId: this.playerId
      })
    );

    this.closePopovers();
  }
}
