import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "admin-achievements-form-win-bets-row",
  templateUrl: "./win-bets-row.component.html"
})
export class WinBetsRowComponent {
  @Input() controlName: FormControl;
}
