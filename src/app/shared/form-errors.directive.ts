import { FormGroup, AbstractControl, ValidationErrors } from "@angular/forms";
import { NzFormControlComponent } from "ng-zorro-antd/form";
import { tap, map, filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import {
  Input,
  QueryList,
  Directive,
  ContentChildren,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from "@angular/core";

import { humanize } from "src/app/common/utils/humanize";
import { Errors } from "src/app/common/models";

@Directive({
  selector: "[formErrors]"
})
export class FormErrorsDirective implements OnInit, OnChanges, OnDestroy {
  @Input() formErrors: Errors = {};
  @Input() formGroup: FormGroup;

  @ContentChildren(NzFormControlComponent, { descendants: true })
  listOfInputDirective: QueryList<NzFormControlComponent> | undefined;

  private subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.initFormChangeSubscribes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.formErrors.firstChange) {
      this.updateErrorsStatus(changes.formErrors.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private get controlsNames(): string[] {
    return Object.keys(this.formGroup.controls);
  }

  private initFormChangeSubscribes(): void {
    for (const controlName of this.controlsNames) {
      const control = this.formGroup.controls[controlName];
      this.subs
        .add(this.subscribeToControlValueChanges(control))
        .add(this.subscribeToUpdateControlStatus(control, controlName));
    }
  }

  private subscribeToControlValueChanges(
    control: AbstractControl
  ): Subscription {
    return control.valueChanges
      .pipe(
        map(() => control.errors),
        tap(errors => {
          if (errors && errors.serverError) {
            const { serverError, ...err } = errors;
            control.setErrors(err);
          }
        })
      )
      .subscribe();
  }

  private subscribeToUpdateControlStatus(
    ngControl: AbstractControl,
    controlName: string
  ): Subscription {
    return ngControl.statusChanges
      .pipe(
        map(() => this.getNzControl(controlName)),
        filter(nzControl => !!nzControl && ngControl.invalid),
        tap(nzControl => {
          nzControl.nzErrorTip = this.getErrorsTipByValidationError(
            controlName,
            ngControl.errors
          );
        })
      )
      .subscribe();
  }

  private updateErrorsStatus(formErrors: Errors) {
    for (const controlName of Object.keys(formErrors)) {
      const ngControl = this.getNgControl(controlName);

      const ngControlErrors = ngControl.errors;
      ngControl.setErrors({ ...ngControlErrors, serverError: true });
    }
  }

  private getNgControl(controlName: string): AbstractControl {
    return this.formGroup.controls[controlName];
  }

  private getNzControl(controlName: string): NzFormControlComponent | null {
    return this.listOfInputDirective.find(input => {
      if (input.defaultValidateControl) {
        return input.defaultValidateControl.name === controlName;
      } else {
        return null;
      }
    });
  }

  private getErrorsTipByValidationError(
    controlName: string,
    errors?: ValidationErrors
  ): string {
    if (!errors) {
      return this.getDefaultError(controlName);
    }

    const errorsKeys = Object.keys(errors);

    return errorsKeys.reduce(
      (errorsMessage: string, validationError, index) => {
        if (index === 0) {
          return this.getErrorTipByValidationError(
            validationError,
            controlName
          );
        }

        return `${errorsMessage}, ${this.getErrorTipByValidationError(
          validationError,
          controlName
        )}`;
      },
      ""
    );
  }

  private getErrorTipByValidationError(
    validationError: string,
    controlName: string
  ) {
    switch (validationError) {
      case "required":
        return `${humanize(controlName)} is required`;
      case "serverError":
        return this.getServerError(controlName);
      default:
        return this.getDefaultError(controlName);
    }
  }

  private getServerError(controlName: string) {
    const errorMessage = this.formErrors[controlName] as string | undefined;

    if (!errorMessage) {
      return this.getDefaultError(controlName);
    }

    return errorMessage;
  }

  private getDefaultError(controlName: string) {
    return `Please enter a valid ${humanize(controlName)}`;
  }
}
