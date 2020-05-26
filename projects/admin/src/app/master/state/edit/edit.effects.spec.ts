import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { EditEffects } from "./edit.effects";
import {
  loadMaster,
  loadMasterFailed,
  loadMasterSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { MasterService } from "../../master.service";

describe("Edit master effects", () => {
  let actions$: Observable<Action>;

  let effects: EditEffects;
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditEffects,
        provideMockActions(() => actions$),
        {
          provide: MasterService,
          useValue: { editMaster: jest.fn(), fetchMaster: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(EditEffects);
    service = TestBed.get(MasterService);
  });

  it("should return a stream with submitSuccess action", () => {
    const payload = {} as any;
    const action = submit(payload);
    const completionSubmitSuccess = submitSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Success edit master"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-(bc)", {
      b: completionSubmitSuccess,
      c: completionNotificationSuccess
    });

    service.editMaster = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed action", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "firstName", value: "", message: "Size" }]
      }
    };

    const httpErrorResponseExpect: any = { firstName: "Size" };

    const action = submit(payload);
    const completionNotificationError = notificationError({
      message: "Cannot be edit master"
    });
    const completionSubmitFailed = submitFailed({
      errors: httpErrorResponseExpect
    });

    actions$ = hot("a---", { a: action });
    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.editMaster = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with loadMasterSuccess action", () => {
    const payload = {} as any;
    const action = loadMaster(payload);
    const completion = loadMasterSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchMaster = jest.fn(() => response);

    expect(effects.loadMaster$).toBeObservable(expected);
  });

  it("should return a stream with loadMasterFailed, notificationError actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: { error: "You don't have permissions for this route" }
    };

    const action = loadMaster(payload);
    const completionNotificationError = notificationError({
      message: "You don't have permissions for this route"
    });
    const completionListFailed = loadMasterFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionListFailed
    });

    service.fetchMaster = jest.fn(() => response);

    expect(effects.loadMaster$).toBeObservable(expected);
  });
});
