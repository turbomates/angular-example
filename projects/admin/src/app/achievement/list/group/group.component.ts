import { Component, Input } from "@angular/core";

import { GroupedAchievement } from "../list.models";

@Component({
  selector: "admin-achievement-list-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent {
  @Input() types: string[];
  @Input() group: GroupedAchievement;
}
