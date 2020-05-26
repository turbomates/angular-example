import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterReducerState } from "@ngrx/router-store";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html"
})
export class BackButtonComponent {
  @Input() backTo: string;

  constructor(private router: Router, private location: Location) {}

  public onBack() {
    const locationState = this.location.getState() as RouterReducerState;

    const isFirstLocation =
      locationState.navigationId && locationState.navigationId === 1;

    if (isFirstLocation) {
      this.router.navigate([this.backTo || "/"]);
    } else {
      this.location.back();
    }
  }
}
