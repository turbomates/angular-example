import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  ListResponse,
  PaginationSearchParams,
  ShowResponse
} from "src/app/common/models";

import { Master } from "./master.model";
import { EditFormRequest } from "./state/edit/edit.model";

@Injectable()
export class MasterService {
  constructor(private http: HttpClient) {}

  public fetchMasters(
    params: PaginationSearchParams
  ): Observable<ListResponse<Master>> {
    return this.http.get<ListResponse<Master>>("admin/agentsystem/masters", {
      params: {
        pageSize: `${params.pageSize}`,
        currentPage: `${params.currentPage}`
      }
    });
  }

  fetchMaster(id: string): Observable<Master> {
    return this.http
      .get<ShowResponse<Master>>(`admin/agentsystem/masters/${id}`)
      .pipe(map(mastersData => mastersData.data));
  }

  editMaster(id: string, body: EditFormRequest) {
    return this.http.post(`admin/agentsystem/masters/${id}/details`, body);
  }
}
