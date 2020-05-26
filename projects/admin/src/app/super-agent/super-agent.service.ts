import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { SuperAgent } from "./super-agent.models";
import {
  ListResponse,
  PaginationSearchParams,
  ShowResponse
} from "src/app/common/models";

import { CreateRequest } from "./create/create.model";
import { EditRequest } from "./edit/edit.model";

@Injectable()
export class SuperAgentService {
  constructor(private http: HttpClient) {}

  public fetchAgent(id: string): Observable<SuperAgent> {
    return this.http
      .get<ShowResponse<SuperAgent>>(`admin/agentsystem/supermasters/${id}`)
      .pipe(map(adminData => adminData.data));
  }

  public fetchAgents(
    params: PaginationSearchParams
  ): Observable<ListResponse<SuperAgent>> {
    return this.http.get<ListResponse<SuperAgent>>(
      "admin/agentsystem/supermasters",
      {
        params: {
          pageSize: `${params.pageSize}`,
          currentPage: `${params.currentPage}`
        }
      }
    );
  }

  public createAgent(body: CreateRequest) {
    return this.http.post("admin/agentsystem/supermasters", body);
  }

  public editAgent(id: string, body: EditRequest) {
    return this.http.post(`admin/agentsystem/supermasters/${id}/details`, body);
  }
}
