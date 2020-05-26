import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../src/environments/environment";

@Injectable()
export class BtsHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      url: environment.apiUrl + req.url,
      withCredentials: true
    });
    return next.handle(req);
  }
}
