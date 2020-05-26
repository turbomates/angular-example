import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { ChangePasswordEffects } from "./change-password.effects";
import { submit, submitFailed, submitSuccess } from "./change-password.actions";
import { AdminService } from "../../admin.service";

describe("Admin change password effects", () => {
  let actions$: Observable<Action>;

  let effects: ChangePasswordEffects;
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangePasswordEffects,
        provideMockActions(() => actions$),
        {
          provide: AdminService,
          useValue: { changePasswordAdmin: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(ChangePasswordEffects);
    service = TestBed.get(AdminService);
  });

  it("should return a stream with submitSuccess, notificationSuccess action", () => {
    const payload = {
      adminId: "123456789",
      body: { newPassword: "123456789" }
    };
    const action = submit(payload);
    const completionSubmitSuccess = submitSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Password success change"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-(bc)", {
      b: completionSubmitSuccess,
      c: completionNotificationSuccess
    });

    service.changePasswordAdmin = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed, notificationError action", () => {
    const payload = {
      adminId: "123456789",
      body: { newPassword: "123456789" }
    };
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "newPassword", value: "", message: "Size" }]
      }
    };

    const httpErrorResponseExpect: any = { newPassword: "Size" };

    const action = submit(payload);
    const completionNotificationError = notificationError({
      message: "Password cannot be change"
    });
    const completionSubmitFailed = submitFailed({
      error: httpErrorResponseExpect
    });

    actions$ = hot("a---", { a: action });
    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.changePasswordAdmin = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });
});
