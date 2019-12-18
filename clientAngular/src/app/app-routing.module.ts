import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components

import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ShopComponent } from "./components/shop/shop.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path : '',
    redirectTo : '/signin',
    pathMatch : 'full'
  },
  {
    path : 'signin',
    component : SigninComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'shop',
    component : ShopComponent,
    canActivate : [
      AuthGuard
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
