import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  ListResponse,
  ShowResponse,
  PaginationSearchParams
} from "src/app/common/models";

import {
  Admin,
  ChangePasswordRequest,
  CreateAdminRequest,
  EditAdminRequest
} from "./admin.model";

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  public fetchAdmin(id: string): Observable<Admin> {
    return this.http
      .get<ShowResponse<Admin>>(`admin/admins/${id}`)
      .pipe(map(({ data }) => data));
  }

  public fetchAdmins(params: PaginationSearchParams) {
    return this.http.get<ListResponse<Admin>>("admin/admins", {
      params: {
        currentPage: `${params.currentPage}`,
        pageSize: `${params.pageSize}`
      }
    });
  }

  public fetchActivities(): Observable<string[]> {
    return this.http
      .get<ShowResponse<string[]>>("admin/activities")
      .pipe(map(activities => activities.data));
  }

  public createAdmin(body: CreateAdminRequest) {
    return this.http.post("admin/admins", body);
  }

  public editAdmin(adminId: string, body: EditAdminRequest) {
    return this.http.post(`admin/admins/${adminId}`, body);
  }

  public changePasswordAdmin(adminId: string, body: ChangePasswordRequest) {
    return this.http.post(`admin/admins/${adminId}/change-password`, body);
  }
}
