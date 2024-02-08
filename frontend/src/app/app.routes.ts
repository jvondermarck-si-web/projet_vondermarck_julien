import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import {SignInComponent} from "./features/sign-in/sign-in.component";
import {SignUpComponent} from "./features/sign-up/sign-up.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
