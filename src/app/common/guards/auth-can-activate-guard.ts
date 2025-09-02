import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthGoogle } from '../services/auth-google';
import { catchError, map, of } from 'rxjs';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authGoogleService = inject(AuthGoogle);

  // If there is already an app token, continue
  const hasToken = !!localStorage.getItem('token');
  if (hasToken) return true;

  // If not, try to complete it (parse Google login + backend exchange)
  return authGoogleService.ensureAppToken$().pipe(
    map((ok) => (ok ? true : router.createUrlTree(['/'])) as boolean | UrlTree),
    catchError(() => of(router.createUrlTree(['/']))),
  );
};
