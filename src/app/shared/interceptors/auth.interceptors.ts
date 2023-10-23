import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith('https://api.cloudinary.com/')) {
      return next.handle(request);
    } else {
      let headers = new HttpHeaders().append(
        'Authorization',
        `Bearer ${this.authService.getToken()}`
      );

      let modifiedReq = request.clone({ headers });

      return next.handle(modifiedReq);
    }
  }
}
