import { Component, Input, ViewEncapsulation } from "@angular/core";

import { AchievementResponse } from "../../achievement.model";

@Component({
  selector: "admin-achievement-list-group-item",
  templateUrl: "./group-item.component.html",
  styleUrls: ["./group-item.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GroupItemComponent {
  @Input() achievement: AchievementResponse;
}
