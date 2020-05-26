import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { PermissionModule } from "../core/permission/permission.module";
import { SharedModule } from "src/app/shared/shared.module";

import { LotteryRoutingModule } from "./lottery-routing.module";
import { effects, initialState, lotteryFeatureKey, reducers } from "./state";
import { LotteryService } from "./lottery.service";
import { ListComponent } from "./components/list/list.component";
import { ScopeComponent } from "./components/list/scope/scope.component";

@NgModule({
  declarations: [ListComponent, ScopeComponent],
  imports: [
    CommonModule,
    LotteryRoutingModule,
    NgZorroAntdModule,
    SharedModule,
    StoreModule.forFeature(lotteryFeatureKey, reducers, {
      initialState
    }),
    EffectsModule.forFeature(effects),
    PermissionModule
  ],
  providers: [LotteryService]
})
export class LotteryModule {}
