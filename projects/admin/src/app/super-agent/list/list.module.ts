import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";
import { PermissionModule } from "../../core/permission/permission.module";

import { ListComponent } from "./list.component";
import {
  initialState,
  listFeatureKey,
  listReducer
} from "./state/list.reducer";
import { ListEffects } from "./state/list.effects";
import { SuperAgentRoutingModule } from "../super-agent-routing.module";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    StoreModule.forFeature(listFeatureKey, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects]),
    SuperAgentRoutingModule,
    SharedModule,
    PermissionModule
  ]
})
export class ListModule {}
