import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ListResponse, PaginationSearchParams } from "src/app/common/models";

import { StreakBet } from "./streak.model";

@Injectable()
export class StreakService {
  constructor(private http: HttpClient) {}

  public fetchStreakBets(
    params: PaginationSearchParams
  ): Observable<ListResponse<StreakBet>> {
    return this.http.get<ListResponse<StreakBet>>("/admin/streak/bets", {
      params: {
        currentPage: `${params.currentPage}`,
        pageSize: `${params.pageSize}`
      }
    });
  }
}
