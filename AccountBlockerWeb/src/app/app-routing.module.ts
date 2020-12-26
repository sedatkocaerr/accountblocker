import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  {path:"login",component:LoginComponent, pathMatch: 'full'},
  {path:"register",component:RegisterComponent, pathMatch: 'full'},
  {path:"",component:HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
