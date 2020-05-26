import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Activity } from "./permission.model";
import { PermissionService } from "./permission.service";

@Injectable({
  providedIn: "root"
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private service: PermissionService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const permissions = route.data.permissions as Activity[];
    const userHasAccess = permissions.some(permission =>
      this.service.hasAccess(permission)
    );

    if (!userHasAccess) {
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }
}
