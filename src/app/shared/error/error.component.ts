import { Component, Input } from "@angular/core";

import { Error } from "src/app/common/models";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html"
})
export class ErrorComponent {
  @Input() error: Error;
}
