import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'browse', loadComponent: () => import('./pages/register/register.component').then(a => a.RegisterComponent) },
    { path: '', loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent) },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent) },
];
