import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/auth.guard";
import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: "admins",
        loadChildren: () =>
          import("./admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: "transaction",
        loadChildren: () =>
          import("./transaction/transaction.module").then(
            m => m.TransactionModule
          )
      },
      {
        path: "bet",
        loadChildren: () => import("./bet/bet.module").then(m => m.BetModule)
      },
      {
        path: "super-agent",
        loadChildren: () =>
          import("./super-agent/super-agent.module").then(
            m => m.SuperAgentModule
          )
      },
      {
        path: "achievement",
        loadChildren: () =>
          import("./achievement/achievement.module").then(
            m => m.AchievementModule
          )
      },
      {
        path: "player",
        loadChildren: () =>
          import("./player/player.module").then(m => m.PlayerModule)
      },
      {
        path: "master",
        loadChildren: () =>
          import("./master/master.module").then(m => m.MasterModule)
      },
      {
        path: "lottery",
        loadChildren: () =>
          import("./lottery/lottery.module").then(m => m.LotteryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
