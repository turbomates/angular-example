import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { ShowEffects } from "./show.effects";
import { SuperAgentService } from "../../super-agent.service";
import {
  loadSuperAgent,
  loadSuperAgentFailed,
  loadSuperAgentSuccess
} from "./show.actions";

describe("Show super agent effects", () => {
  let actions$: Observable<Action>;

  let effects: ShowEffects;
  let service: SuperAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowEffects,
        provideMockActions(() => actions$),
        {
          provide: SuperAgentService,
          useValue: { fetchAgent: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(ShowEffects);
    service = TestBed.get(SuperAgentService);
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
