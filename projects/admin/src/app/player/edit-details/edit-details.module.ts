import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { PlayerRoutingModule } from "../player-routing.module";
import { EditDetailsComponent } from "./edit-details.component";
import { EditDetailsEffects } from "./state/edit-details.effects";
import {
  initialState,
  editDetailsReducer,
  editDetailsFeatureKey
} from "./state/edit-details.reducer";

@NgModule({
  declarations: [EditDetailsComponent],
  imports: [
    PlayerRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    StoreModule.forFeature(editDetailsFeatureKey, editDetailsReducer, {
      initialState
    }),
    EffectsModule.forFeature([EditDetailsEffects]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditDetailsModule {}
