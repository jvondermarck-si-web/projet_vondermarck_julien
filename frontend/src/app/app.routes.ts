import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import {SignInComponent} from "./features/sign-in/sign-in.component";
import {SignUpComponent} from "./features/sign-up/sign-up.component";
import {AccountComponent} from "./features/account/account.component";
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { productGuard } from './core/guards/product.guard';
import { BasketComponent } from './features/basket/basket.component';

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
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'Product | Livalie',
    canActivate: [productGuard]
  },
  {
    path: 'basket',
    component: BasketComponent,
    title: 'Basket | Livalie',
  },
  {
    path: 'card-form',
    loadChildren: () => import('./modules/card/card.routes').then(m => m.CardRoutingModule)
  },
  {
    path: '**',
    redirectTo: '',
  },
];
