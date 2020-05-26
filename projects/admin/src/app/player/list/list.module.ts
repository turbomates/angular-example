import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";
import { PermissionModule } from "../../core/permission/permission.module";

import { PlayerRoutingModule } from "../player-routing.module";
import { ListComponent } from "./list.component";
import { ListEffects } from "./state/list.effects";
import {
  initialState,
  listFeatureKey,
  listReducer
} from "./state/list.reducer";

@NgModule({
  declarations: [ListComponent],
  imports: [
    PlayerRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    StoreModule.forFeature(listFeatureKey, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects]),
    CommonModule,
    PermissionModule
  ]
})
export class ListModule {}
