import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";

import { AchievementRoutingModule } from "../achievement-routing.module";
import { CreateGroupComponent } from "./create-group.component";
import { CreateGroupEffects } from "./state/create-group.effects";
import {
  createGroupFeatureKey,
  createGroupFormReducer,
  initialState
} from "./state/create-group.reducer";
import { AchievementService } from "../achievement.service";

@NgModule({
  declarations: [CreateGroupComponent],
  imports: [
    CommonModule,
    AchievementRoutingModule,
    NgZorroAntdModule,
    SharedModule,
    StoreModule.forFeature(createGroupFeatureKey, createGroupFormReducer, {
      initialState
    }),
    EffectsModule.forFeature([CreateGroupEffects]),
    ReactiveFormsModule
  ],
  providers: [AchievementService]
})
export class CreateGroupModule {}
