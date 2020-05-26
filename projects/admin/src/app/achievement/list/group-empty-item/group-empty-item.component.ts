import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "admin-achievement-list-group-empty-item",
  templateUrl: "./group-empty-item.component.html",
  styleUrls: ["./group-empty-item.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GroupEmptyItemComponent {
  @Input() groupId: string;
}
