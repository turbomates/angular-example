import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PermissionGuard } from "../core/permission/permission.guard";

import { ListComponent } from "./list/list.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { ShowComponent } from "./show/show.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["LIST_SUPERMASTERS"] }
  },
  {
    path: "create",
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["CREATE_SUPERMASTER"] }
  },
  {
    path: "edit/:id",
    component: EditComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["UPDATE_SUPERMASTER_DETAILS"] }
  },
  {
    path: "show/:id",
    component: ShowComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["SHOW_SUPERMASTER"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAgentRoutingModule {}
