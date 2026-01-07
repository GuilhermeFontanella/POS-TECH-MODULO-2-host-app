import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./ui/home-page/home-page.module')
      .then(m => m.HomePageModule),
  },
  {
    title: 'Login page',
    path: 'login',
    loadChildren: () => import('./ui/login-page/login-page.module')
      .then(m => m.LoginPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
