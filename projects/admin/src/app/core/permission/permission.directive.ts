import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit
} from "@angular/core";

import { Activity } from "./permission.model";
import { PermissionService } from "./permission.service";

@Directive({
  selector: "[hasAccess]"
})
export class PermissionDirective implements OnInit {
  @Input("hasAccess") activities: Activity[];

  constructor(
    private service: PermissionService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.hasPermission) {
      this.container.createEmbeddedView(this.template);
    } else {
      this.container.clear();
    }
  }

  private get hasPermission(): boolean {
    return this.activities.some(activity => this.service.hasAccess(activity));
  }
}
