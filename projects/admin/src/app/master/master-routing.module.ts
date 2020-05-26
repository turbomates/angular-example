import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PermissionGuard } from "../core/permission/permission.guard";

import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { ShowComponent } from "./show/show.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["LIST_MASTERS"] }
  },
  {
    path: "edit/:id",
    component: EditComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["UPDATE_MASTER_DETAILS"] }
  },
  {
    path: "show/:id",
    component: ShowComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["SHOW_MASTER"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
