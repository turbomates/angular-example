import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, tap } from "rxjs/operators";
import { Subscription } from "rxjs";

import { Player } from "../player.model";
import { loadPlayer, reset, submit } from "./state/edit-details.actions";
import { EditDetailsState } from "./edit-details.model";
import {
  getData,
  getErrors,
  getIsSubmitting
} from "./state/edit-details.selectors";

@Component({
  selector: "admin-player-edit-details",
  templateUrl: "./edit-details.component.html"
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  editForm?: FormGroup;

  formErrors$ = this.store.select(getErrors);
  isSubmitting$ = this.store.select(getIsSubmitting);
  data$ = this.store.select(getData);

  private playerId: string;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<EditDetailsState>
  ) {}

  ngOnInit() {
    this.playerId = this.route.snapshot.params["id"];
    this.store.dispatch(loadPlayer({ playerId: this.playerId }));

    this.subs.add(this.subscribeToPlayer());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reset());
    this.subs.unsubscribe();
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
        tap(data => this.initForm(data))
      )
      .subscribe();
  }

  private initForm(data: Player) {
    this.editForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      country: [data.country, Validators.required],
      state: [data.state, Validators.required],
      city: [data.city, Validators.required],
      gender: [data.gender, Validators.required],
      birthday: [data.birthday, Validators.required],
      zip: [data.zip, Validators.required],
      street: [data.street, Validators.required],
      house: [data.house, Validators.required],
      phone: [data.phoneNumber, Validators.required],
      mobile: [data.mobileNumber, Validators.required]
    });
  }
}
