import { Routes } from '@angular/router';
import { pasoUnaVezGuard } from './guard/paso-una-vez.guard';
import { logeadoGuard } from './guard/logeado.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./page/home/home.page').then((m) => m.HomePage),
    canActivate: [logeadoGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./page/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    loadComponent: () =>
      import('./page/splash/splash.page').then((m) => m.SplashPage),
    canActivate: [pasoUnaVezGuard],
  },
  {
    path: 'chat4a',
    loadComponent: () =>
      import('./page/chat/chat.page').then((m) => m.ChatPage),
  },
  {
    path: 'chat4b',
    loadComponent: () =>
      import('./page/chat/chat.page').then((m) => m.ChatPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./page/chat/chat.page').then((m) => m.ChatPage),
  },
];
