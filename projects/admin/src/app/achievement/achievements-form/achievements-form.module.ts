import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";

import { AchievementsFormComponent } from "./achievements-form.component";
import { BetsComponent } from "./bets/bets.component";
import { PointsComponent } from "./points/points.component";
import { WinBetsRowComponent } from "./win-bets-row/win-bets-row.component";
import { OpenedAchievementsComponent } from "./opened-achievements/opened-achievements.component";

@NgModule({
  declarations: [
    BetsComponent,
    PointsComponent,
    AchievementsFormComponent,
    WinBetsRowComponent,
    OpenedAchievementsComponent
  ],
  exports: [AchievementsFormComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    SharedModule
  ]
})
export class AchievementsFormModule {}
