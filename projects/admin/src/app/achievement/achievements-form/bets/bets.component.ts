import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "admin-achievements-form-bets",
  templateUrl: "./bets.component.html"
})
export class BetsComponent {
  @Input() controlName: FormControl;
}
