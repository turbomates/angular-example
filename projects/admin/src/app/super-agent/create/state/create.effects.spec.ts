import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { CreateEffects } from "./create.effects";
import { SuperAgentService } from "../../super-agent.service";
import { submit, submitFailed, submitSuccess } from "./create.actions";

describe("Create super agent effects", () => {
  let actions$: Observable<Action>;

  let effects: CreateEffects;
  let service: SuperAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateEffects,
        provideMockActions(() => actions$),
        {
          provide: SuperAgentService,
          useValue: { createAgent: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(CreateEffects);
    service = TestBed.get(SuperAgentService);
  });

  it("should return a stream with submitSuccess action", () => {
    const payload = {} as any;
    const action = submit(payload);
    const completion = submitSuccess();

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.createAgent = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed action", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "newPassword", value: "", message: "Size" }]
      }
    };

    const httpErrorResponseExpect: any = { newPassword: "Size" };

    const action = submit(payload);
    const completionNotificationError = notificationError({
      message: "Cannot be create super agent"
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

    service.createAgent = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a notificationSuccess action", () => {
    const action = submitSuccess();
    const completion = notificationSuccess({
      message: "Success create super agent"
    });

    actions$ = hot("-a", { a: action });
    const expected = cold("-b", { b: completion });

    expect(effects.submitSuccess$).toBeObservable(expected);
  });
});
