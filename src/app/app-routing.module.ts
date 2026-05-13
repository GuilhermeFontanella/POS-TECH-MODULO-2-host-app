import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './interceptors/auth.guard';

const routes: Routes = [
  {
    title: '',
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full',
  },
  {
    title: 'Home page',
    path: 'home-page',
    canActivate: [authGuard],
    loadChildren: () => import('./ui/home-page/home-page.module')
      .then(m => m.HomePageModule),
  },
  {
    title: 'Login page',
    path: 'login',
    loadChildren: () => import('./ui/login-page/login-page.module')
      .then(m => m.LoginPageModule),
  },
  {
    title: '',
    path: '**',
    canActivate: [authGuard],
    loadChildren: () => import('./ui/home-page/home-page.module')
      .then(m => m.HomePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
