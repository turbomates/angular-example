import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzTableModule,
  NzDividerModule,
  NgZorroAntdModule
} from "ng-zorro-antd";

import { AdminService } from "./admin.service";
import { ListModule } from "./list/list.module";
import { EditModule } from "./edit/edit.module";
import { CreateModule } from "./create/create.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { ChangePasswordModule } from "./change-password/change-password.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzTableModule,
    NzDividerModule,
    ListModule,
    EditModule,
    CreateModule,
    NgZorroAntdModule,
    ChangePasswordModule
  ],
  providers: [AdminService]
})
export class AdminModule {}
