import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ListResponse, PaginationSearchParams } from "src/app/common/models";

import { Transaction } from "./state/list.model";

@Injectable()
export class ListLoadService {
  constructor(private http: HttpClient) {}

  public fetchList(
    params: PaginationSearchParams
  ): Observable<ListResponse<Transaction>> {
    return this.http.get<ListResponse<Transaction>>(`/admin/transactions`, {
      params: {
        pageSize: `${params.pageSize}`,
        currentPage: `${params.currentPage}`
      }
    });
  }
}
