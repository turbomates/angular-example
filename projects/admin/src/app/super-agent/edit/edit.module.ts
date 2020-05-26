import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "src/app/shared/shared.module";

import { SuperAgentRoutingModule } from "../super-agent-routing.module";
import { EditComponent } from "./edit.component";
import { initialState } from "../create/state/create.reducer";
import { EditEffects } from "./state/edit.effects";
import { editFeatureKey, editFormReducer } from "./state/edit.reducer";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    SuperAgentRoutingModule,
    StoreModule.forFeature(editFeatureKey, editFormReducer, {
      initialState
    }),
    EffectsModule.forFeature([EditEffects])
  ]
})
export class EditModule {}
