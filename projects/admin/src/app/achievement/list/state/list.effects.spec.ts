import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { ListEffects } from "./list.effects";
import { loadList, loadListFailed, loadListSuccess } from "./list.actions";
import { AchievementService } from "../../achievement.service";

describe("Achievement list effects", () => {
  let actions$: Observable<Action>;

  let effects: ListEffects;
  let service: AchievementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListEffects,
        provideMockActions(() => actions$),
        {
          provide: AchievementService,
          useValue: { fetchGroupedList: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(ListEffects);
    service = TestBed.get(AchievementService);
  });

  it("should return a stream with loadListSuccess action", () => {
    const payload = {} as any;
    const action = loadList();
    const completion = loadListSuccess({ list: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchGroupedList = jest.fn(() => response);

    expect(effects.loadList$).toBeObservable(expected);
  });

  it("should return a stream with loadListFailed, notificationError  actions", () => {
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Achievement cannot be loaded"
    );

    const action = loadList();
    const completionNotificationError = notificationError({
      message: parsedError.message
    });
    const completionListFailed = loadListFailed({
      error: parsedError
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionListFailed
    });

    service.fetchGroupedList = jest.fn(() => response);

    expect(effects.loadList$).toBeObservable(expected);
  });
});
