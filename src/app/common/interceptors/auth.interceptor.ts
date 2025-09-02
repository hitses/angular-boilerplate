import { inject, Injector } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthGoogle } from '../services/auth-google';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const skipUrls = [
    'https://accounts.google.com/.well-known/openid-configuration',
    'https://www.googleapis.com/oauth2/v3/certs',
  ];

  const router = inject(Router);
  const injector = inject(Injector);
  const token = localStorage.getItem('token');

  const shouldSkip = skipUrls.some((url) => req.url.startsWith(url));

  if (token && !shouldSkip)
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        const authGoogle = injector.get(AuthGoogle);
        authGoogle.logout();

        router.navigate(['/']);
      }

      return throwError(() => err);
    }),
  );
};
