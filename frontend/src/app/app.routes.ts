import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import {SignInComponent} from "./features/sign-in/sign-in.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  }
];
