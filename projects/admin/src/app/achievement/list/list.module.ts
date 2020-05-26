import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "src/app/shared/shared.module";
import { PermissionModule } from "../../core/permission/permission.module";

import { ListComponent } from "./list.component";
import { AchievementRoutingModule } from "../achievement-routing.module";
import { AchievementService } from "../achievement.service";
import { ListEffects } from "./state/list.effects";
import {
  initialState,
  listFeatureKey,
  listReducer
} from "./state/list.reducer";
import { GroupComponent } from "./group/group.component";
import { GroupItemComponent } from "./group-item/group-item.component";
import { GroupEmptyItemComponent } from "./group-empty-item/group-empty-item.component";

@NgModule({
  declarations: [
    ListComponent,
    GroupComponent,
    GroupItemComponent,
    GroupEmptyItemComponent
  ],
  imports: [
    CommonModule,
    AchievementRoutingModule,
    NgZorroAntdModule,
    SharedModule,
    StoreModule.forFeature(listFeatureKey, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects]),
    PermissionModule
  ],
  providers: [AchievementService]
})
export class ListModule {}
