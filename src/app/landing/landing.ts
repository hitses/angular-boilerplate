import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthGoogle } from '../common/services/auth-google';

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
})
export default class Landing {
  private readonly authGoogleService = inject(AuthGoogle);

  loginWithGoogle() {
    this.authGoogleService.login();
  }
}
