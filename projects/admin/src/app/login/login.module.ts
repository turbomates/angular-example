import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [NgZorroAntdModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class LoginModule {}
