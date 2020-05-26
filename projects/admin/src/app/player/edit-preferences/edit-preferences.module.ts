import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { PlayerRoutingModule } from "../player-routing.module";
import { EditPreferencesComponent } from "./edit-preferences.component";
import { EditPreferencesEffects } from "./state/edit-preferences.effects";
import {
  editPreferencesReducer,
  initialState,
  editPreferencesFeatureKey
} from "./state/edit-preferences.reducer";

@NgModule({
  declarations: [EditPreferencesComponent],
  imports: [
    PlayerRoutingModule,
    SharedModule,
    NgZorroAntdModule,
    StoreModule.forFeature(editPreferencesFeatureKey, editPreferencesReducer, {
      initialState
    }),
    EffectsModule.forFeature([EditPreferencesEffects]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditPreferencesModule {}
