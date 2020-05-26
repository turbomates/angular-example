import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "src/app/shared/shared.module";

import { AchievementRoutingModule } from "../achievement-routing.module";
import { ShowComponent } from "./show.component";
import { ShowEffects } from "./state/show.effects";
import {
  initialState,
  showFeatureKey,
  showReducer
} from "./state/show.reducer";

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    AchievementRoutingModule,
    SharedModule,
    StoreModule.forFeature(showFeatureKey, showReducer, {
      initialState
    }),
    EffectsModule.forFeature([ShowEffects])
  ]
})
export class ShowModule {}
