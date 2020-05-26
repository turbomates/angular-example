import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { PermissionGuard } from "../core/permission/permission.guard";
import { ShowComponent } from "./show/show.component";
import { EditPreferencesComponent } from "./edit-preferences/edit-preferences.component";
import { EditDetailsComponent } from "./edit-details/edit-details.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["LIST_PLAYERS"] }
  },
  {
    path: ":id",
    children: [
      {
        path: "show",
        component: ShowComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ["LIST_PLAYERS"] }
      },
      {
        path: "edit-details",
        component: EditDetailsComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ["EDIT_PLAYER_DETAILS"] }
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ["LIST_PLAYERS"] }
      },
      {
        path: "edit-preferences",
        component: EditPreferencesComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ["EDIT_PLAYER_PREFERENCES"] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
