import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";

import { ListModule } from "./list/list.module";
import { PlayerRoutingModule } from "./player-routing.module";
import { PlayerService } from "./player.service";
import { ShowModule } from "./show/show.module";
import { EditPreferencesModule } from "./edit-preferences/edit-preferences.module";
import { EditDetailsModule } from "./edit-details/edit-details.module";
import { ChangePasswordModule } from "./change-password/change-password.module";

@NgModule({
  providers: [PlayerService],
  imports: [
    PlayerRoutingModule,
    SharedModule,
    ListModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ShowModule,
    EditPreferencesModule,
    EditDetailsModule,
    ChangePasswordModule
  ]
})
export class PlayerModule {}
