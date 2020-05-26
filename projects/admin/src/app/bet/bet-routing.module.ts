import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent as StreakBetListComponent } from "./streak/streak.component";
import { BetComponent } from "./bet.component";

const routes: Routes = [
  {
    path: "",
    component: BetComponent,
    children: [
      { path: "streak", component: StreakBetListComponent },
      { path: "**", redirectTo: "streak" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetRoutingModule {}
