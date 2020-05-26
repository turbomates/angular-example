import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "admin-achievements-form-opened-achievements",
  templateUrl: "./opened-achievements.component.html"
})
export class OpenedAchievementsComponent {
  @Input() controlName: FormControl;
}
