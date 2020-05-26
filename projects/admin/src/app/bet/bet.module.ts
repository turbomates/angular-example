import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { StreakModule } from "./streak/streak.module";
import { BetRoutingModule } from "./bet-routing.module";
import { BetComponent } from "./bet.component";

@NgModule({
  declarations: [BetComponent],
  imports: [BetRoutingModule, StreakModule, NgZorroAntdModule]
})
export class BetModule {}
