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

import { EditGroupEffects } from "./edit-group.effects";
import {
  loadAchievement,
  loadAchievementFailed,
  loadAchievementSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-group.actions";
import { AchievementService } from "../../achievement.service";

describe("Edit group achievement effects", () => {
  let actions$: Observable<Action>;

  let effects: EditGroupEffects;
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditGroupEffects,
        provideMockActions(() => actions$),
        {
          provide: AchievementService,
          useValue: {
            editAchievementGroup: jest.fn(),
            fetchAchievementGroup: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(EditGroupEffects);
    service = TestBed.get(AchievementService);
  });

  it("should return a stream with submitSuccess action", () => {
    const payload = {} as any;
    const action = submit({ id: "123", body: payload });
    const completion = submitSuccess();

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.editAchievementGroup = jest.fn(() => response);

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

    const action = submit({ id: "123", body: payload });
    const completionNotificationError = notificationError({
      message: "Cannot be edit achievement group"
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

    service.editAchievementGroup = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a notificationSuccess action", () => {
    const action = submitSuccess();
    const completion = notificationSuccess({
      message: "Success edit achievement group"
    });

    actions$ = hot("-a", { a: action });
    const expected = cold("-b", { b: completion });

    expect(effects.submitSuccess$).toBeObservable(expected);
  });

  it("should return a stream with loadAchievementSuccess action", () => {
    const payload = {} as any;
    const action = loadAchievement(payload);
    const completion = loadAchievementSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchAchievementGroup = jest.fn(() => response);

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
      "Achievement group cannot be loaded"
    );

    const action = loadAchievement(payload);
    const completionNotificationError = notificationError({
      message: "You don't have permissions for this route"
    });
    const completionListFailed = loadAchievementFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionListFailed
    });

    service.fetchAchievementGroup = jest.fn(() => response);

    expect(effects.loadAchievement$).toBeObservable(expected);
  });
});
