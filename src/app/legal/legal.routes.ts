import { Routes } from '@angular/router';

export const legalRoutes: Routes = [
  {
    path: 'legal',
    loadComponent: () => import('./pages/legal/legal'),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy'),
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms'),
  },
  { path: '**', redirectTo: 'legal' },
];
