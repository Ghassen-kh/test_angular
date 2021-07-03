import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'signin',pathMatch:'full'},
  {
    path: 'signup',
    component: SignupFormComponent
  },
  {
    path: '',
    component: SigninComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
