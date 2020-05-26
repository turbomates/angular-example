import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "admin-achievements-form-points",
  templateUrl: "./points.component.html"
})
export class PointsComponent {
  @Input() controlName: FormControl;
}
