import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "../admin-routing.module";

import { CreateEffects } from "./create.effects";
import { CreateComponent } from "./create.component";
import {
  createFormReducer,
  createFeatureKey,
  initialState
} from "./create.reducer";

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgZorroAntdModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(createFeatureKey, createFormReducer, {
      initialState
    }),
    EffectsModule.forFeature([CreateEffects])
  ]
})
export class CreateModule {}
