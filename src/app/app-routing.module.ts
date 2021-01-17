import { UrunduzenlemeComponent } from './components/urunduzenleme/urunduzenleme.component';

import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent},
  {path: 'urunduzenleme/:key', component: UrunduzenlemeComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
