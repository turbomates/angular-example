import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Player } from "./player.model";
import {
  ListResponse,
  PaginationSearchParams,
  ShowResponse
} from "src/app/common/models";
import { Account, AccountRequest } from "./account/account.model";
import { EditPreferencesRequest } from "./edit-preferences/edit-preferences.model";
import { EditDetailsRequest } from "./edit-details/edit-details.model";
import { ChangePasswordRequest } from "./change-password/change-password.model";

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {}

  public fetchPlayer(id: string): Observable<Player> {
    return this.http
      .get<ShowResponse<Player>>(`admin/players/${id}`)
      .pipe(map(playerData => playerData.data));
  }

  public fetchPlayers(
    params: PaginationSearchParams
  ): Observable<ListResponse<Player>> {
    return this.http.get<ListResponse<Player>>("admin/players", {
      params: {
        pageSize: `${params.pageSize}`,
        currentPage: `${params.currentPage}`
      }
    });
  }

  public fetchAccounts(playerId: string): Observable<Account[]> {
    return this.http
      .get<ShowResponse<Account[]>>(`admin/accounts/player/${playerId}`)
      .pipe(map(accountData => accountData.data));
  }

  public takeAccountMoney(accountId: string, body: AccountRequest) {
    return this.http.post(
      `admin/accounts/bookmaker/take-money/${accountId}`,
      body
    );
  }

  public sendAccountMoney(accountId: string, body: AccountRequest) {
    return this.http.post(
      `admin/accounts/bookmaker/send-money/${accountId}`,
      body
    );
  }

  public resetPassword(playerId: string, body: ChangePasswordRequest) {
    return this.http.post(`admin/users/${playerId}/change-password`, body);
  }

  public editDetails(playerId: string, body: EditDetailsRequest) {
    return this.http.post(`admin/players/details/${playerId}`, body);
  }

  public editPreferences(playerId: string, body: EditPreferencesRequest) {
    return this.http.post(`admin/players/preferences/${playerId}`, body);
  }
}
