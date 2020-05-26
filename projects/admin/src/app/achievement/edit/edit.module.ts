import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "src/app/shared/shared.module";

import { AchievementRoutingModule } from "../achievement-routing.module";
import { EditComponent } from "./edit.component";
import {
  editFeatureKey,
  editFormReducer,
  initialState
} from "./state/edit.reducer";
import { EditEffects } from "./state/edit.effects";
import { AchievementService } from "../achievement.service";
import { AchievementsFormModule } from "../achievements-form/achievements-form.module";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    AchievementRoutingModule,
    StoreModule.forFeature(editFeatureKey, editFormReducer, {
      initialState
    }),
    EffectsModule.forFeature([EditEffects]),
    AchievementsFormModule
  ],
  providers: [AchievementService]
})
export class EditModule {}
