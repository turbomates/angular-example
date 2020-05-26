import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { filter, tap } from "rxjs/operators";

import { EditFormState } from "../state/edit/edit.reducer";
import { loadMaster, reset, submit } from "../state/edit/edit.actions";
import { Master } from "../master.model";
import {
  getData,
  getErrors,
  getSubmitting
} from "../state/edit/edit.selectors";

@Component({
  selector: "admin-master-edit",
  templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;

  isSubmitting$ = this.store.select(getSubmitting);
  formErrors$ = this.store.select(getErrors);
  data$ = this.store.select(getData);

  private masterId: string;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<EditFormState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.masterId = this.route.snapshot.params["id"];
    this.store.dispatch(loadMaster({ id: this.masterId }));

    this.subs.add(this.subscribeToMaster());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(reset());
  }

  public onSubmit() {
    this.store.dispatch(
      submit({ id: this.masterId, body: this.editForm.value })
    );
  }

  private subscribeToMaster(): Subscription {
    return this.data$
      .pipe(
        filter(data => !!data),
        tap(data => {
          this.initForm(data);
        })
      )
      .subscribe();
  }

  private initForm(data: Master) {
    this.editForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      phone: [data.phone, Validators.required]
    });
  }
}
