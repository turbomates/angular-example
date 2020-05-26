import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";

import { PlayerRoutingModule } from "../player-routing.module";
import { ShowEffects } from "./state/show.effects";
import { ShowComponent } from "./show.component";
import {
  initialState,
  showFeatureKey,
  showReducer
} from "./state/show.reducer";
import { AccountModule } from "../account/account.module";

@NgModule({
  declarations: [ShowComponent],
  imports: [
    PlayerRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    StoreModule.forFeature(showFeatureKey, showReducer, { initialState }),
    EffectsModule.forFeature([ShowEffects]),
    CommonModule,
    ReactiveFormsModule,
    AccountModule
  ]
})
export class ShowModule {}
