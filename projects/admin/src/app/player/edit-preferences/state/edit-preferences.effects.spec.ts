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
import { EditPreferencesEffects } from "./edit-preferences.effects";
import {
  loadPlayer,
  loadPlayerFailed,
  loadPlayerSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-preferences.actions";

describe("Edit preferences player effects", () => {
  let actions$: Observable<Action>;

  let effects: EditPreferencesEffects;
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditPreferencesEffects,
        provideMockActions(() => actions$),
        {
          provide: PlayerService,
          useValue: { fetchPlayer: jest.fn(), editPreferences: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(EditPreferencesEffects);
    service = TestBed.get(PlayerService);
  });

  it("should return a stream with loadPlayerSuccess action", () => {
    const payload = {} as any;
    const action = loadPlayer(payload);
    const completion = loadPlayerSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchPlayer = jest.fn(() => response);

    expect(effects.loadPlayer$).toBeObservable(expected);
  });

  it("should return a stream with loadPlayerFailed, notificationError  actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Players cannot be loaded"
    );

    const action = loadPlayer(payload);
    const completionNotificationError = notificationError({
      message: parsedError.message
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

  it("should return a stream with submitSuccess, notificationSuccess action", () => {
    const payload = {} as any;
    const action = submit(payload);
    const completionSubmitSuccess = submitSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Success edit preferences"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-(bc)", {
      b: completionSubmitSuccess,
      c: completionNotificationSuccess
    });

    service.editPreferences = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed, notificationError action", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "locale", value: "", message: "Size" }]
      }
    };

    const httpErrorResponseExpect: any = { locale: "Size" };

    const action = submit(payload);
    const completionNotificationError = notificationError({
      message: "Cannot be edit preferences"
    });
    const completionSubmitFailed = submitFailed({
      error: httpErrorResponseExpect
    });

    actions$ = hot("a---", { a: action });
    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.editPreferences = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });
});
