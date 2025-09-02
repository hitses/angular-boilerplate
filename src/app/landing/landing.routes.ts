import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./landing'),
  },
];
