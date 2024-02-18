import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import {SignInComponent} from "./features/sign-in/sign-in.component";
import {SignUpComponent} from "./features/sign-up/sign-up.component";
import {AccountComponent} from "./features/account/account.component";
import { ProductsComponent } from './features/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Livalie',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Sign-in | Livalie',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign-up | Livalie',
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account | Livalie',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products | Livalie',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
