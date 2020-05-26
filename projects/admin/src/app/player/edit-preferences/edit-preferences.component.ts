import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { Choice } from "src/app/common/models";

import { Player } from "../player.model";
import { loadPlayer, reset, submit } from "./state/edit-preferences.actions";
import { EditPreferencesState } from "./edit-preferences.model";
import {
  getEditData,
  getErrors,
  getIsSubmitting
} from "./state/edit-preferences.selectors";

@Component({
  selector: "admin-player-edit-preferences",
  templateUrl: "./edit-preferences.component.html"
})
export class EditPreferencesComponent implements OnInit, OnDestroy {
  localeChoices: Choice[] = [
    { value: "en_US", label: "en_US" },
    { value: "ru_RU", label: "ru_RU" }
  ];
  currencyChoices: Choice[] = [
    { value: "EUR", label: "EUR" },
    { value: "USD", label: "USD" }
  ];
  oddFormatChoices: Choice[] = [{ value: "EUROPE", label: "Europe" }];
  editForm?: FormGroup;

  formErrors$ = this.store.select(getErrors);
  isSubmitting$ = this.store.select(getIsSubmitting);
  data$ = this.store.select(getEditData);

  private playerId: string;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<EditPreferencesState>
  ) {}

  ngOnInit() {
    this.playerId = this.route.snapshot.params["id"];
    this.store.dispatch(loadPlayer({ playerId: this.playerId }));

    this.subs.add(this.subscribeToPlayer());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
  }

  onSubmit() {
    this.store.dispatch(
      submit({ playerId: this.playerId, body: this.editForm.value })
    );
  }

  private subscribeToPlayer(): Subscription {
    return this.data$
      .pipe(
        filter(data => !!data),
        tap(data => {
          this.initForm(data);
        })
      )
      .subscribe();
  }

  private initForm(data: Player) {
    this.editForm = this.fb.group({
      locale: [data.locale, Validators.required],
      currency: [data.currency, Validators.required],
      oddFormat: [data.oddFormat, Validators.required]
    });
  }
}
