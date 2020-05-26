import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { filter, tap } from "rxjs/operators";

import { SuperAgent } from "../super-agent.models";
import { EditFormState } from "./edit.model";
import { loadSuperAgent, submit, reset } from "./state/edit.actions";
import {
  getData,
  getFormErrors,
  getIsSubmitting
} from "./state/edit.selectors";

@Component({
  selector: "admin-super-agent-edit",
  templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;

  isSubmitting$ = this.store.select(getIsSubmitting);
  formErrors$ = this.store.select(getFormErrors);
  data$ = this.store.select(getData);

  private superAgentId: string;
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<EditFormState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.superAgentId = this.route.snapshot.params["id"];
    this.store.dispatch(loadSuperAgent({ id: this.superAgentId }));

    this.subs.add(this.subscribeToSuperAgent());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(reset());
  }

  public onSubmit() {
    this.store.dispatch(
      submit({ id: this.superAgentId, body: this.editForm.value })
    );
  }

  private subscribeToSuperAgent(): Subscription {
    return this.data$
      .pipe(
        filter(data => !!data),
        tap(data => {
          this.initForm(data);
        })
      )
      .subscribe();
  }

  private initForm(data: SuperAgent) {
    this.editForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      phone: [data.phone]
    });
  }
}
