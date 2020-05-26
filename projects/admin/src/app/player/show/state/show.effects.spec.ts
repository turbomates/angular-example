import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { PlayerService } from "../../player.service";
import { ShowEffects } from "./show.effects";
import {
  loadPlayer,
  loadPlayerFailed,
  loadPlayerSuccess
} from "./show.actions";

describe("Show player effects", () => {
  let actions$: Observable<Action>;

  let effects: ShowEffects;
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowEffects,
        provideMockActions(() => actions$),
        {
          provide: PlayerService,
          useValue: {
            fetchPlayer: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(ShowEffects);
    service = TestBed.get(PlayerService);
  });

  it("should be return a stream with loadPlayerSuccess action", () => {
    const payload = {} as any;
    const action = loadPlayer(payload);
    const completion = loadPlayerSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchPlayer = jest.fn(() => response);

    expect(effects.loadPlayer$).toBeObservable(expected);
  });

  it("should be return a stream with loadPlayerFailed, notificationError actions", () => {
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

    const action = loadPlayer(payload);
    const completionNotificationError = notificationError({
      message: "You don't have permissions for this route"
    });
    const completionSubmitFailed = loadPlayerFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.fetchPlayer = jest.fn(() => response);

    expect(effects.loadPlayer$).toBeObservable(expected);
  });
});
