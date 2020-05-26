import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PermissionGuard } from "../core/permission/permission.guard";

import { ListComponent } from "./list/list.component";
import { EditGroupComponent } from "./edit-group/edit-group.component";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { CreateComponent } from "./create/create.component";
import { ShowComponent } from "./show/show.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["LIST_ACHIEVEMENTS"] }
  },
  {
    path: "create-group",
    component: CreateGroupComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["CREATE_ACHIEVEMENT_GROUP"] }
  },
  {
    path: "edit-group/:id",
    component: EditGroupComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["UPDATE_ACHIEVEMENT_GROUP"] }
  },
  {
    path: "create/:groupId",
    component: CreateComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["CREATE_ACHIEVEMENT"] }
  },
  {
    path: "edit/:id",
    component: EditComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["UPDATE_ACHIEVEMENT"] }
  },
  {
    path: "show/:achievementId",
    component: ShowComponent,
    canActivate: [PermissionGuard],
    data: { permissions: ["SHOW_ACHIEVEMENT"] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementRoutingModule {}
