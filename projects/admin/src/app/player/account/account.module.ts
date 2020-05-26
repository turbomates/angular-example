import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";

import { PlayerRoutingModule } from "../player-routing.module";
import {
  accountFeatureKey,
  accountReducer,
  initialState
} from "./state/account.reducer";
import { AccountComponent } from "./account.component";
import { AccountEffects } from "./state/account.effects";
import { PlayerService } from "../player.service";

@NgModule({
  declarations: [AccountComponent],
  exports: [AccountComponent],
  imports: [
    PlayerRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    StoreModule.forFeature(accountFeatureKey, accountReducer, { initialState }),
    EffectsModule.forFeature([AccountEffects]),
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [PlayerService]
})
export class AccountModule {}
