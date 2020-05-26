import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { CreateGroupEffects } from "./create-group.effects";
import { submit, submitFailed, submitSuccess } from "./create-group.actions";
import { AchievementService } from "../../achievement.service";

describe("Create group achievement effects", () => {
  let actions$: Observable<Action>;

  let effects: CreateGroupEffects;
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateGroupEffects,
        provideMockActions(() => actions$),
        {
          provide: AchievementService,
          useValue: { createAchievementGroup: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(CreateGroupEffects);
    service = TestBed.get(AchievementService);
  });

  it("should return a stream with submitSuccess action", () => {
    const payload = {} as any;
    const action = submit(payload);
    const completion = submitSuccess();

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.createAchievementGroup = jest.fn(() => response);

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
      message: "Cannot be create group achievement"
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

    service.createAchievementGroup = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a notificationSuccess action", () => {
    const action = submitSuccess();
    const completion = notificationSuccess({
      message: "Success create group achievement"
    });

    actions$ = hot("-a", { a: action });
    const expected = cold("-b", { b: completion });

    expect(effects.submitSuccess$).toBeObservable(expected);
  });
});
