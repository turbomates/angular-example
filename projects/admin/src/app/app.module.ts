import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData, APP_BASE_HREF } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule, routerReducer } from "@ngrx/router-store";
import { en_US, NgZorroAntdModule, NZ_I18N } from "ng-zorro-antd";
import en from "@angular/common/locales/en";

import { environment } from "../environments/environment";

import { UserEffects } from "./core/user/user.effects";
import { userKey, userReducer } from "./core/user/user.reducer";
import { LoginModule } from "./login/login.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import { AppRoutingModule } from "./app-routing.module";
import { IconsProviderModule } from "./icons-provider.module";
import { BtsHttpInterceptor } from "./core/http.interceptor";
import { PermissionModule } from "./core/permission/permission.module";
import { NotificationEffects } from "./core/notification/notification.effects";

registerLocaleData(en);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, LayoutComponent],
  imports: [
    LoginModule,
    FormsModule,
    BrowserModule,
    PermissionModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      router: routerReducer,
      [userKey]: userReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot([]),
    EffectsModule.forRoot([NotificationEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/admin" },
    { provide: HTTP_INTERCEPTORS, useClass: BtsHttpInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppModule {}
