import { Routes } from '@angular/router';
import { authCanActivateGuard } from './common/guards/auth-can-activate-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./landing/landing.routes').then((r) => r.landingRoutes),
  },
  {
    path: 'legal',
    loadChildren: () =>
      import('./legal/legal.routes').then((r) => r.legalRoutes),
  },
  {
    path: 'main',
    canActivate: [authCanActivateGuard],
    loadChildren: () => import('./main/main.routes').then((r) => r.mainRoutes),
  },
  { path: '**', redirectTo: '' },
];
