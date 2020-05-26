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
import { submit, submitFailed, submitSuccess } from "./create.actions";
import { AchievementService } from "../../achievement.service";
import { AchievementRequest } from "../../achievements-form/achievements-form.models";

describe("Create achievement effects", () => {
  let actions$: Observable<Action>;

  let effects: CreateEffects;
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateEffects,
        provideMockActions(() => actions$),
        {
          provide: AchievementService,
          useValue: { createAchievement: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(CreateEffects);
    service = TestBed.get(AchievementService);
  });

  it("should return a stream with submitSuccess, notificationSuccess action", () => {
    const payload: AchievementRequest = {
      badge: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhQ",
      description: "description",
      title: "title",
      fee: 10,
      rank: 10,
      enabled: false,
      repeatable: false,
      groupId: "123",
      bets: { count: 10 }
    };
    const action = submit({ body: payload });
    const completionSubmitSuccess = submitSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Success create achievement"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-(bc)", {
      b: completionSubmitSuccess,
      c: completionNotificationSuccess
    });

    service.createAchievement = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed action", () => {
    const payload: AchievementRequest = {
      badge: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhQ",
      description: "",
      title: "asd",
      fee: 10,
      rank: 10,
      enabled: false,
      repeatable: false,
      groupId: "123",
      bets: { count: 10 }
    };
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "description", value: "", message: "Size" }]
      }
    };
    const httpErrorResponseExpect: any = { description: "Size" };

    const action = submit({ body: payload });
    const completionNotificationError = notificationError({
      message: "Cannot be create achievement"
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

    service.createAchievement = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });
});
