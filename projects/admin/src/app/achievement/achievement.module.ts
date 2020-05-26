import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListModule } from "./list/list.module";
import { AchievementRoutingModule } from "./achievement-routing.module";
import { CreateGroupModule } from "./create-group/create-group.module";
import { EditGroupModule } from "./edit-group/edit-group.module";
import { EditModule } from "./edit/edit.module";
import { CreateModule } from "./create/create.module";
import { ShowModule } from "./show/show.module";

@NgModule({
  imports: [
    CommonModule,
    AchievementRoutingModule,
    ListModule,
    CreateGroupModule,
    EditGroupModule,
    CreateModule,
    ShowModule,
    EditModule
  ]
})
export class AchievementModule {}
