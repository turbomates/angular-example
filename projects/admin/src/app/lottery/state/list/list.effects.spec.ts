import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jest-marbles";
import { Action } from "@ngrx/store";

import { parseError } from "src/app/common/models";
import { notificationError } from "../../../core/notification/notification.actions";

import { ListEffects } from "./list.effects";
import { loadList, loadListFailed, loadListSuccess } from "./list.actions";
import { LotteryService } from "../../lottery.service";
import { SearchParams } from "../../lottery.model";

describe("Lottery list effects", () => {
  let actions$: Observable<Action>;

  let effects: ListEffects;
  let service: LotteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListEffects,
        provideMockActions(() => actions$),
        {
          provide: LotteryService,
          useValue: { fetchList: jest.fn() }
        }
      ]
    });

    effects = TestBed.get(ListEffects);
    service = TestBed.get(LotteryService);
  });

  it("should return a stream with loadListSuccess action", () => {
    const payload = {} as any;
    const searchParams: SearchParams = {
      pageSize: 30,
      currentPage: 2,
      type: "settle"
    };
    const action = loadList({ params: searchParams });
    const completion = loadListSuccess({ data: payload, params: searchParams });

    actions$ = hot("a---", { a: action });

    const response = cold("-a", { a: payload });
    const expected = cold("-b", { b: completion });

    service.fetchList = jest.fn(() => response);

    expect(effects.loadList$).toBeObservable(expected);
  });

  it("should return a stream with loadListFailed, notificationError  actions", () => {
    const payload = {} as any;
    const httpErrorResponse: any = {
      status: 401,
      message: "You don't have permissions for this route",
      error: { error: "You don't have permissions for this route" }
    };
    const parsedError = parseError(
      httpErrorResponse,
      "Lottery cannot be loaded"
    );

    const action = loadList(payload);
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

    service.fetchList = jest.fn(() => response);

    expect(effects.loadList$).toBeObservable(expected);
  });
});
