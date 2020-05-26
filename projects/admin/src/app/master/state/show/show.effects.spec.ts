import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { notificationError } from "../../../core/notification/notification.actions";
import { parseError } from "src/app/common/models";

import { ShowEffects } from "./show.effects";
import { MasterService } from "../../master.service";
import {
  loadMaster,
  loadMasterFailed,
  loadMasterSuccess
} from "./show.actions";

describe("Show master effects", () => {
  let actions$: Observable<Action>;

  let effects: ShowEffects;
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowEffects,
        provideMockActions(() => actions$),
        {
          provide: MasterService,
          useValue: {
            fetchMaster: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(ShowEffects);
    service = TestBed.get(MasterService);
  });

  it("should be return a stream with loadMasterSuccess action", () => {
    const payload = {} as any;
    const action = loadMaster(payload);
    const completion = loadMasterSuccess({ data: payload });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchMaster = jest.fn(() => response);

    expect(effects.loadMaster$).toBeObservable(expected);
  });

  it("should be return a stream with loadMasterFailed, notificationError actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Master cannot be loaded"
    );

    const action = loadMaster(payload);
    const completionNotificationError = notificationError({
      message: parsedError.message
    });
    const completionSubmitFailed = loadMasterFailed();

    actions$ = hot("a---", { a: action });

    const response = cold("-#", {}, httpErrorResponse);
    const expected = cold("-(bc)", {
      b: completionNotificationError,
      c: completionSubmitFailed
    });

    service.fetchMaster = jest.fn(() => response);

    expect(effects.loadMaster$).toBeObservable(expected);
  });
});
