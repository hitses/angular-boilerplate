import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '@src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  from,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {
  private readonly oAuthService = inject(OAuthService);
  private readonly httpClient = inject(HttpClient);

  private readonly appTokenReady$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token'),
  );

  constructor() {
    this.initGoogleLogin();
  }

  initGoogleLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleClientId,
      redirectUri: window.location.origin + '/main',
      scope: 'openid email profile',
    };

    this.oAuthService.configure(config);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken())
        this.exchangeWithBackend$().subscribe();
    });

    this.oAuthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.exchangeWithBackend$().subscribe();
      });

    this.oAuthService.setupAutomaticSilentRefresh();
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    localStorage.removeItem('token');
    this.oAuthService.logOut();
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  ensureAppToken$(): Observable<boolean> {
    if (localStorage.getItem('token')) return of(true);

    // Retry parsing the URL (in case the guard runs right when you return from Google)
    return from(this.oAuthService.loadDiscoveryDocumentAndTryLogin()).pipe(
      switchMap(() => this.exchangeWithBackend$()),
    );
  }

  private exchangeWithBackend$(): Observable<boolean> {
    // If already get the backend token, don't repeat
    if (localStorage.getItem('token')) {
      this.appTokenReady$.next(true);
      return of(true);
    }

    const idToken = this.oAuthService.getIdToken();
    if (!idToken) return of(false);

    return this.httpClient
      .post<{ token: string }>(`${environment.apiUrl}/auth/google`, {
        token: idToken,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.appTokenReady$.next(true);
        }),
        map(() => true),
        catchError(() => {
          // If the exchange fails, clean everything so as not to leave strange states
          this.logout();
          return of(false);
        }),
        // Cache the result in case of multiple simultaneous guard subscriptions
        shareReplay(1),
      );
  }
}
