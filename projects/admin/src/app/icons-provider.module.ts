import { NgModule } from "@angular/core";
import { NZ_ICONS } from "ng-zorro-antd";

import {
  FormOutline,
  HomeOutline,
  UserOutline,
  LockOutline,
  LockTwoTone,
  LogoutOutline,
  MenuFoldOutline,
  ArrowLeftOutline,
  DashboardOutline,
  MenuUnfoldOutline,
  EditOutline,
  PlusOutline,
  UploadOutline,
  InfoCircleOutline
} from "@ant-design/icons-angular/icons";

const icons = [
  FormOutline,
  HomeOutline,
  UserOutline,
  LockOutline,
  LockTwoTone,
  LogoutOutline,
  MenuFoldOutline,
  ArrowLeftOutline,
  DashboardOutline,
  MenuUnfoldOutline,
  PlusOutline,
  EditOutline,
  UploadOutline,
  InfoCircleOutline
];

@NgModule({
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsProviderModule {}
