import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "../admin-routing.module";

import { EditEffects } from "./edit.effects";
import { EditComponent } from "./edit.component";
import { editFormReducer, editFeatureKey, initialState } from "./edit.reducer";

@NgModule({
  declarations: [EditComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([EditEffects]),
    StoreModule.forFeature(editFeatureKey, editFormReducer, {
      initialState
    })
  ]
})
export class EditModule {}
