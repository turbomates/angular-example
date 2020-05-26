import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { instance } from "ts-mockito";
import { Action } from "@ngrx/store";

import { parseError } from "src/app/common/models";
import {
  notificationError,
  notificationSuccess
} from "../../../core/notification/notification.actions";

import { PlayerService } from "../../player.service";
import { EditDetailsEffects } from "./edit-details.effects";
import {
  loadPlayer,
  loadPlayerFailed,
  loadPlayerSuccess,
  submit,
  submitFailed,
  submitSuccess
} from "./edit-details.actions";

describe("Edit details player effects", () => {
  let actions$: Observable<Action>;

  let effects: EditDetailsEffects;
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditDetailsEffects,
        provideMockActions(() => actions$),
        {
          provide: PlayerService,
          useValue: { fetchPlayer: jest.fn(), editDetails: jest.fn() }
        },
        { provide: Location, useFactory: () => instance(Location) },
        { provide: Router, useFactory: () => instance(Router) }
      ]
    });

    effects = TestBed.get(EditDetailsEffects);
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

  it("should return a stream with submitSuccess action", () => {
    const payload = {} as any;
    const action = submit(payload);
    const completionSubmitSuccess = submitSuccess();
    const completionNotificationSuccess = notificationSuccess({
      message: "Success edit details"
    });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-(bc)", {
      b: completionSubmitSuccess,
      c: completionNotificationSuccess
    });

    service.editDetails = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });

  it("should return a stream with submitFailed action", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      error: {
        errors: [{ property: "email", value: "", message: "Size" }]
      }
    };

    const httpErrorResponseExpect: any = { email: "Size" };

    const action = submit(payload);
    const completionNotificationError = notificationError({
      message: "Cannot be edit details"
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

    service.editDetails = jest.fn(() => response);

    expect(effects.submit$).toBeObservable(expected);
  });
});
