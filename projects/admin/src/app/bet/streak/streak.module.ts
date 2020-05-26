import { NgModule } from "@angular/core";
import { NgZorroAntdModule, NzTableModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { BetRoutingModule } from "../bet-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { ListComponent } from "./streak.component";
import { StreakService } from "./streak.service";
import { initialState, listFeatureKey, listReducer } from "./streak.reducer";
import { ListEffects } from "./streak.effects";

@NgModule({
  providers: [StreakService],
  declarations: [ListComponent],
  imports: [
    BetRoutingModule,
    NzTableModule,
    CommonModule,
    SharedModule,
    StoreModule.forFeature(listFeatureKey, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects]),
    NgZorroAntdModule
  ]
})
export class StreakModule {}
