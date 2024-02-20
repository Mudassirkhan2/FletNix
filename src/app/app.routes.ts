import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'register', loadComponent: () => import('./pages/register/register.component').then(a => a.RegisterComponent) },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/browse/browse.component').then(a => a.BrowseComponent)
    },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent) },
    {
        path: 'movie/:movietitle',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/movietitle/movietitle.component').then(a => a.MovietitleComponent)
    }
];
