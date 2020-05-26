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

import { EditEffects } from "./edit.effects";
import { SuperAgentService } from "../../super-agent.service";
import {
  loadSuperAgent,
  loadSuperAgentFailed,
  loadSuperAgentSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";

describe("Edit super agent effects", () => {
  let actions$: Observable<Action>;

  let effects: EditEffects;
  let service: SuperAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditEffects,
        provideMockActions(() => actions$),
        {
          provide: SuperAgentService,
          useValue: { editAgent: jest.fn(), fetchAgent: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(EditEffects);
    service = TestBed.get(SuperAgentService);
  });

  it("should return a stream with submitSuccess action", () => {
    const payload = {} as any;
    const action = submit(payload);
    const completion = submitSuccess();

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.editAgent = jest.fn(() => response);

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
      message: "Cannot be edit super agent"
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

    service.editAgent = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a notificationSuccess action", () => {
    const action = submitSuccess();
    const completion = notificationSuccess({
      message: "Success edit super agent"
    });

    actions$ = hot("-a", { a: action });
    const expected = cold("-b", { b: completion });

    expect(effects.submitSuccess$).toBeObservable(expected);
  });

  it("should return a stream with loadSuperAgentSuccess action", () => {
    const payload = {} as any;
    const action = loadSuperAgent(payload);
    const completion = loadSuperAgentSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchAgent = jest.fn(() => response);

    expect(effects.loadSuperAgent$).toBeObservable(expected);
  });

  it("should return a stream with loadSuperAgentFailed, notificationError actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Super agent cannot be loaded"
    );

    const action = loadSuperAgent(payload);
    const completionNotificationError = notificationError({
      message: "You don't have permissions for this route"
    });
    const completionListFailed = loadSuperAgentFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionListFailed
    });

    service.fetchAgent = jest.fn(() => response);

    expect(effects.loadSuperAgent$).toBeObservable(expected);
  });
});
