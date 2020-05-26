import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { notificationError } from "../../../core/notification/notification.actions";
import { parseError } from "src/app/common/models";

import { ShowEffects } from "./show.effects";
import { AchievementService } from "../../achievement.service";
import {
  loadAchievement,
  loadAchievementFailed,
  loadAchievementSuccess
} from "./show.actions";

describe("Show achievement effects", () => {
  let actions$: Observable<Action>;

  let effects: ShowEffects;
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowEffects,
        provideMockActions(() => actions$),
        {
          provide: AchievementService,
          useValue: { fetchAchievement: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(ShowEffects);
    service = TestBed.get(AchievementService);
  });

  it("should be return a stream with loadAchievementSuccess action", () => {
    const payload = {} as any;
    const action = loadAchievement(payload);
    const completion = loadAchievementSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchAchievement = jest.fn(() => response);

    expect(effects.loadAchievement$).toBeObservable(expected);
  });

  it("should be return a stream with loadAchievementFailed, notificationError actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Achievement cannot be loaded"
    );

    const action = loadAchievement(payload);
    const completionNotificationError = notificationError({
      message: "You don't have permissions for this route"
    });
    const completionSubmitFailed = loadAchievementFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.fetchAchievement = jest.fn(() => response);

    expect(effects.loadAchievement$).toBeObservable(expected);
  });
});
