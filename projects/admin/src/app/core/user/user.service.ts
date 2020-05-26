import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { first, map } from "rxjs/operators";

import { ShowResponse } from "src/app/common/models";

import { User, LoginRequest } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  public loadUser() {
    return this.http.get<ShowResponse<User>>("/admin/admins/me").pipe(
      first(),
      map(showResponse => showResponse.data)
    );
  }

  public login(body: LoginRequest) {
    return this.http.post("/admin/login", body);
  }

  public logout() {
    return this.http.get("/logout");
  }
}
