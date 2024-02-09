import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import {SignInComponent} from "./features/sign-in/sign-in.component";
import {SignUpComponent} from "./features/sign-up/sign-up.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Livalie - Home',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Livalie - Sign In',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Livalie - Sign Up',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
