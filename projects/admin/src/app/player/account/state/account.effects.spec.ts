import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { parseError } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { PlayerService } from "../../player.service";
import {
  loadAccount,
  loadAccountFailed,
  loadAccountSuccess,
  submitFailed,
  submitSendAccountMoney,
  submitSuccess,
  submitTakeAccountMoney
} from "./account.actions";
import { AccountEffects } from "./account.effects";

describe("Account player effects", () => {
  let actions$: Observable<Action>;

  let effects: AccountEffects;
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountEffects,
        provideMockActions(() => actions$),
        {
          provide: PlayerService,
          useValue: {
            fetchAccounts: jest.fn(),
            takeAccountMoney: jest.fn(),
            sendAccountMoney: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(AccountEffects);
    service = TestBed.get(PlayerService);
  });

  it("should be return a stream with loadAccountSuccess action after loadAccount", () => {
    const payload = {} as any;
    const action = loadAccount(payload);
    const completion = loadAccountSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchAccounts = jest.fn(() => response);

    expect(effects.loadAccount$).toBeObservable(expected);
  });

  it("should be return a stream with loadAccountFailed, notificationError actions after loadAccount", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Account cannot be loaded"
    );

    const action = loadAccount(payload);
    const completionNotificationError = notificationError({
      message: "You don't have permissions for this route"
    });
    const completionSubmitFailed = loadAccountFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.fetchAccounts = jest.fn(() => response);

    expect(effects.loadAccount$).toBeObservable(expected);
  });

  it("should be return a stream with submitSuccess, notificationSuccess action after sendAccountMoney", () => {
    const payload = {} as any;

    const action = submitSendAccountMoney(payload);
    const completionNotificationSuccess = notificationSuccess({
      message: "Money has been sent"
    });
    const completionLoadAccount = submitSuccess(payload);

    actions$ = hot("a---", { a: action });

    const response = cold("-a|", payload);
    const expected = cold("-(bc)", {
      b: completionNotificationSuccess,
      c: completionLoadAccount
    });

    service.sendAccountMoney = jest.fn(() => response);

    expect(effects.sendAccountMoney$).toBeObservable(expected);
  });

  it("should be return a stream with notificationError, submitFailed actions after submitSendAccountMoney", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "amount", value: "", message: "Size" }]
      }
    };
    const httpErrorResponseExpect: any = { amount: "Size" };

    const action = submitSendAccountMoney(payload);
    const completionNotificationError = notificationError({
      message: "Money cannot be sent"
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

    service.sendAccountMoney = jest.fn(() => response);

    expect(effects.sendAccountMoney$).toBeObservable(expected);
  });

  it("should be return a stream with submitSuccess, notificationSuccess action after submitTakeAccountMoney", () => {
    const payload = {} as any;

    const action = submitTakeAccountMoney(payload);
    const completionNotificationSuccess = notificationSuccess({
      message: "Money has been taken"
    });
    const completionLoadAccount = submitSuccess(payload);

    actions$ = hot("a---", { a: action });

    const response = cold("-a|", payload);
    const expected = cold("-(bc)", {
      b: completionNotificationSuccess,
      c: completionLoadAccount
    });

    service.takeAccountMoney = jest.fn(() => response);

    expect(effects.takeAccountMoney$).toBeObservable(expected);
  });

  it("should be return a stream with notificationError, submitFailed actions after takeAccountMoney", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "amount", value: "", message: "Size" }]
      }
    };
    const httpErrorResponseExpect: any = { amount: "Size" };

    const action = submitTakeAccountMoney(payload);
    const completionNotificationError = notificationError({
      message: "Money cannot be taken"
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

    service.takeAccountMoney = jest.fn(() => response);

    expect(effects.takeAccountMoney$).toBeObservable(expected);
  });

  it("should be return a stream with loadAccount actions after submitSuccess", () => {
    const payload = {} as any;

    const action = submitSuccess(payload);
    const completion = loadAccount(payload);

    actions$ = hot("-a", { a: action });

    const expected = cold("-b", { b: completion });

    expect(effects.submitSuccess$).toBeObservable(expected);
  });
});
