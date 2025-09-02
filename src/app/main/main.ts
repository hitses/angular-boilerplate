import { Component, inject } from '@angular/core';
import { AuthGoogle } from '../common/services/auth-google';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
})
export default class Main {
  private readonly authGoogleService = inject(AuthGoogle);
  private readonly router = inject(Router);

  logout() {
    this.authGoogleService.logout();

    this.router.navigate(['/']);
  }
}
