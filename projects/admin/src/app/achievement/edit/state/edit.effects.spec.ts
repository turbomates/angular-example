import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";

import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";
import { parseError } from "src/app/common/models";

import {
  deleteAchievement,
  deleteAchievementFailed,
  deleteAchievementSuccess,
  loadAchievement,
  loadAchievementFailed,
  loadAchievementSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit.actions";
import { AchievementService } from "../../achievement.service";
import { EditEffects } from "./edit.effects";
import { AchievementRequest } from "../../achievements-form/achievements-form.models";

describe("Edit achievement effects", () => {
  let actions$: Observable<Action>;

  let effects: EditEffects;
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditEffects,
        provideMockActions(() => actions$),
        {
          provide: AchievementService,
          useValue: {
            fetchAchievement: jest.fn(),
            editAchievement: jest.fn(),
            deleteAchievement: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: Router
        }
      ]
    });

    effects = TestBed.get(EditEffects);
    service = TestBed.get(AchievementService);
  });

  it("should return a stream with submitSuccess, notificationSuccess action", () => {
    const payload: AchievementRequest = {
      badge: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhQ",
      description: "",
      title: "",
      fee: 10,
      rank: 10,
      enabled: false,
      repeatable: false,
      groupId: "123",
      bets: { count: 10 }
    };
    const action = submit({ body: payload, id: "123" });
    const completionSubmitSuccess = submitSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Success edit achievement"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-(bc)", {
      b: completionSubmitSuccess,
      c: completionNotificationSuccess
    });

    service.editAchievement = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed, notificationError action", () => {
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

    const action = submit({ body: payload, id: "123" });
    const completionNotificationError = notificationError({
      message: "Cannot be edit achievement"
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

    service.editAchievement = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with loadAchievementSuccess action", () => {
    const payload = {} as any;
    const action = loadAchievement(payload);
    const completion = loadAchievementSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchAchievement = jest.fn(() => response);

    expect(effects.loadAchievement$).toBeObservable(expected);
  });

  it("should return a stream with loadAchievementFailed, notificationError actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Player cannot be loaded"
    );

    const action = loadAchievement(payload);
    const completionNotificationError = notificationError({
      message: parsedError.message
    });
    const completionListFailed = loadAchievementFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionListFailed
    });

    service.fetchAchievement = jest.fn(() => response);

    expect(effects.loadAchievement$).toBeObservable(expected);
  });

  it("should return a stream with deleteAchievementSuccess, notificationSuccess action", () => {
    const id = "123";
    const action = deleteAchievement({ id });
    const completionDeleteAchievementSuccess = deleteAchievementSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Success delete achievement"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: id });
    const expected = cold("-(bc)", {
      b: completionDeleteAchievementSuccess,
      c: completionNotificationSuccess
    });

    service.deleteAchievement = jest.fn(() => response);

    expect(effects.deleteAchievement$).toBeObservable(expected);
  });

  it("should return a stream with deleteAchievementFailed, notificationError action", () => {
    const httpErrorResponse: any = {};

    const action = deleteAchievement({ id: "123" });
    const completionNotificationError = notificationError({
      message: "Cannot be delete achievement"
    });
    const completionDeleteAchievementFailed = deleteAchievementFailed();

    actions$ = hot("a---", { a: action });
    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionDeleteAchievementFailed,
      c: completionNotificationError
    });

    service.deleteAchievement = jest.fn(() => response);

    expect(effects.deleteAchievement$).toBeObservable(expected);
  });
});
