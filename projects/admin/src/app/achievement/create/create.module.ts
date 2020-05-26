import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";

import { AchievementRoutingModule } from "../achievement-routing.module";
import { CreateEffects } from "./state/create.effects";
import { CreateComponent } from "./create.component";
import {
  createFormReducer,
  createFeatureKey,
  initialState
} from "./state/create.reducer";
import { AchievementService } from "../achievement.service";
import { AchievementsFormModule } from "../achievements-form/achievements-form.module";

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    AchievementRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(createFeatureKey, createFormReducer, {
      initialState
    }),
    EffectsModule.forFeature([CreateEffects]),
    SharedModule,
    AchievementsFormModule
  ],
  providers: [AchievementService]
})
export class CreateModule {}
