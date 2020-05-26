import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SuperAgentService } from "./super-agent.service";
import { SuperAgentRoutingModule } from "./super-agent-routing.module";
import { ListModule } from "./list/list.module";
import { CreateModule } from "./create/create.module";
import { ShowModule } from "./show/show.module";
import { EditModule } from "./edit/edit.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    SuperAgentRoutingModule,
    ListModule,
    CreateModule,
    EditModule,
    ShowModule
  ],
  providers: [SuperAgentService]
})
export class SuperAgentModule {}
