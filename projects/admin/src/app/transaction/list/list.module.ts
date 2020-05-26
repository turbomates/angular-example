import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule, NzTableModule } from "ng-zorro-antd";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { TransactionRoutingModule } from "../transaction-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { ListComponent } from "./list.component";
import { ListLoadService } from "./list-load.service";
import { ListEffects } from "./state/list.effects";
import {
  initialState,
  listFeatureKey,
  listReducer
} from "./state/list.reducer";

@NgModule({
  providers: [ListLoadService],
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NgZorroAntdModule,
    TransactionRoutingModule,
    StoreModule.forFeature(listFeatureKey, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects]),
    SharedModule
  ]
})
export class ListModule {}
