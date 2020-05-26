import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "../admin-routing.module";
import { PermissionModule } from "../../core/permission/permission.module";

import { ListEffects } from "./list.effects";
import { ListComponent } from "./list.component";
import { listFeatureKey, listReducer, initialState } from "./list.reducer";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    AdminRoutingModule,
    PermissionModule,
    StoreModule.forFeature(listFeatureKey, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects]),
    SharedModule
  ]
})
export class ListModule {}
