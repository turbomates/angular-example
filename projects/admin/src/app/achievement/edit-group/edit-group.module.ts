import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "src/app/shared/shared.module";

import { EditGroupComponent } from "./edit-group.component";
import { AchievementRoutingModule } from "../achievement-routing.module";
import { EditGroupEffects } from "./state/edit-group.effects";
import {
  editGroupFeatureKey,
  editGroupFormReducer,
  initialState
} from "./state/edit-group.reducer";
import { AchievementService } from "../achievement.service";

@NgModule({
  declarations: [EditGroupComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    AchievementRoutingModule,
    StoreModule.forFeature(editGroupFeatureKey, editGroupFormReducer, {
      initialState
    }),
    EffectsModule.forFeature([EditGroupEffects])
  ],
  providers: [AchievementService]
})
export class EditGroupModule {}
