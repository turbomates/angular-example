import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { PlayerRoutingModule } from "../player-routing.module";
import { ChangePasswordComponent } from "./change-password.component";
import {
  changePasswordReducer,
  initialState,
  changePasswordFeatureKey
} from "./state/change-password.reducer";
import { ChangePasswordEffects } from "./state/change-password.effects";

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    PlayerRoutingModule,
    NgZorroAntdModule,
    SharedModule,
    StoreModule.forFeature(changePasswordFeatureKey, changePasswordReducer, {
      initialState
    }),
    EffectsModule.forFeature([ChangePasswordEffects]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChangePasswordModule {}
