import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ReactiveFormsModule } from "@angular/forms";

import { PermissionModule } from "../core/permission/permission.module";
import { SharedModule } from "src/app/shared/shared.module";

import { effects, initialState, masterFeatureKey, reducers } from "./state";
import { MasterRoutingModule } from "./master-routing.module";
import { ListComponent } from "./list/list.component";
import { MasterService } from "./master.service";
import { ShowComponent } from "./show/show.component";
import { EditComponent } from "./edit/edit.component";

@NgModule({
  declarations: [ListComponent, EditComponent, ShowComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    MasterRoutingModule,
    StoreModule.forFeature(masterFeatureKey, reducers, {
      initialState
    }),
    EffectsModule.forFeature(effects),
    PermissionModule,
    ReactiveFormsModule
  ],
  providers: [MasterService]
})
export class MasterModule {}
