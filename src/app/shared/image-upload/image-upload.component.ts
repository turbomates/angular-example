import { Component, Injector, OnInit } from "@angular/core";
import { UploadFile } from "ng-zorro-antd";
import { Subscription } from "rxjs";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploadComponent,
      multi: true
    }
  ],
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit, ControlValueAccessor {
  loading = false;
  imageUrl: string;
  private onChange: Function;
  private ngControl: NgControl;

  constructor(private inj: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  writeValue(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  handleChange(info: { file: UploadFile }): void {
    this.getBase64(info.file!.originFileObj!, (img: string) => {
      this.loading = false;
      this.imageUrl = img;
      this.onChange(this.imageUrl);
    });
  }

  customReq(): Subscription {
    return Subscription.EMPTY;
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();

    if (img) {
      reader.onload = () => callback(reader.result!.toString());
      reader.readAsDataURL(img);
    }
  }
}
