import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { ListResponse } from "src/app/common/models";
import { Lottery, SearchParams } from "./lottery.model";

@Injectable()
export class LotteryService {
  constructor(private http: HttpClient) {}

  public fetchList(
    searchParams: SearchParams
  ): Observable<ListResponse<Lottery>> {
    let params = new HttpParams({
      fromObject: {
        currentPage: `${searchParams.currentPage}`,
        pageSize: `${searchParams.pageSize}`
      }
    });

    if (searchParams.type) params = params.append("type", searchParams.type);

    return this.http.get<ListResponse<Lottery>>(`admin/lotteries`, {
      params
    });
  }

  public cancelLottery(id: string) {
    return this.http.post(`admin/lotteries/${id}/cancel`, {});
  }

  public settleLottery(lotteryId: string) {
    // TO DO when will be API
    // return this.http.post(`admin/lotteries/${id}/settle `, {});
  }

  public settleTicket(ticketsNumber: number, lotteryId: string) {
    // TO DO when will be API
    // return this.http.post(
    // 	`admin/lotteries/${lotteryId}/tickets/${ticketsNumber}/win`,
    // 	{}
    // );
  }
}
