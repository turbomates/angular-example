import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { ErrorComponent } from "./error/error.component";
import { FormErrorsDirective } from "./form-errors.directive";
import { ImageUploadComponent } from "./image-upload/image-upload.component";
import { BackButtonComponent } from "./back-button/back-button.component";

@NgModule({
  declarations: [
    ErrorComponent,
    BackButtonComponent,
    ImageUploadComponent,
    FormErrorsDirective
  ],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [
    ErrorComponent,
    FormErrorsDirective,
    ImageUploadComponent,
    BackButtonComponent
  ]
})
export class SharedModule {}
