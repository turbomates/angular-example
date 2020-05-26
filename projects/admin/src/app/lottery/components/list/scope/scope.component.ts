import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Choice } from "src/app/common/models";

@Component({
  selector: "admin-lottery-list-scope",
  templateUrl: "./scope.component.html"
})
export class ScopeComponent {
  scopesMap: Choice[] = [
    { label: "All", value: null },
    { label: "New", value: "new" },
    { label: "Calculated", value: "settle" },
    { label: "Active", value: "active" },
    { label: "Current", value: "non_settle" },
    { label: "Cancel", value: "cancel" },
    { label: "Fail", value: "fail" }
  ];

  @Input() value?: string = null;
  @Output() onSelect$ = new EventEmitter<string>();

  select(type?: string) {
    this.onSelect$.emit(type);
  }

  selectTabs() {
    return this.scopesMap.findIndex(({ value }) => value === this.value);
  }
}
