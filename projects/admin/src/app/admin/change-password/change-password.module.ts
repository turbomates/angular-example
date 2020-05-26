import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";

import { AdminRoutingModule } from "../admin-routing.module";
import { ChangePasswordComponent } from "./change-password.component";
import {
  changePasswordFeatureKey,
  changePasswordReducer,
  initialState
} from "./state/change-password.reducer";
import { ChangePasswordEffects } from "./state/change-password.effects";

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgZorroAntdModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(changePasswordFeatureKey, changePasswordReducer, {
      initialState
    }),
    EffectsModule.forFeature([ChangePasswordEffects])
  ]
})
export class ChangePasswordModule {}
