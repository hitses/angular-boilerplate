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
  const router = inject(Router);
  const injector = inject(Injector);
  const token = localStorage.getItem('token');

  if (token)
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
