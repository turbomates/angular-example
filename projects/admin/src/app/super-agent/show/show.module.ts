import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { SharedModule } from "src/app/shared/shared.module";

import { SuperAgentRoutingModule } from "../super-agent-routing.module";
import { ShowComponent } from "./show.component";
import { ShowEffects } from "./state/show.effects";
import { StoreModule } from "@ngrx/store";
import {
  initialState,
  showFeatureKey,
  showReducer
} from "./state/show.reducer";

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    SuperAgentRoutingModule,
    ReactiveFormsModule,
    SuperAgentRoutingModule,
    StoreModule.forFeature(showFeatureKey, showReducer, {
      initialState
    }),
    EffectsModule.forFeature([ShowEffects]),
    SharedModule
  ]
})
export class ShowModule {}
