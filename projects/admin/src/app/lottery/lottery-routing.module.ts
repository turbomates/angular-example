import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PermissionGuard } from "../core/permission/permission.guard";

import { ListComponent } from "./components/list/list.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["LIST_LOTTERY"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotteryRoutingModule {}
