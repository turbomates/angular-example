import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PermissionGuard } from "../core/permission/permission.guard";

import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { CreateComponent } from "./create/create.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["LIST_ADMINS"] }
  },
  {
    path: "create",
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["CREATE_ADMIN"] }
  },
  {
    path: "edit/:id",
    component: EditComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["EDIT_ADMIN"] }
  },
  {
    path: "change-password/:id",
    component: ChangePasswordComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["CHANGE_ADMIN_PASSWORD"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
