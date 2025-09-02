import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./main'),
  },
  { path: '**', redirectTo: '' },
];
