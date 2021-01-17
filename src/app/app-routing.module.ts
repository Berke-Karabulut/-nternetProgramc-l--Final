
import { KateklesilComponent } from './components/kateklesil/kateklesil.component';
import { UrunduzenlemeComponent } from './components/urunduzenleme/urunduzenleme.component';

import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {path: '', component: HomeComponent},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {path: 'admin', component: AdminComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    authGuardPipe: redirectLogin
  }},

  {path: 'urunduzenleme/:key', component: UrunduzenlemeComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    authGuardPipe: redirectLogin
  }},

  {path: 'kateklesil', component: KateklesilComponent,
  canActivate: [AngularFireAuthGuard],
  data: {
    authGuardPipe: redirectLogin
  }},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
