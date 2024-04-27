import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { TuiAlertService } from '@taiga-ui/core';

export const productGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const productService = inject(ProductService);
  const tuiAlertService = inject(TuiAlertService);
  const router = inject(Router);

  const id = route.paramMap.get('id');
  if (id === null) {
    console.error('No id parameter found in the URL');
    return false;
  } 

  return productService.getProductFromId(+id).pipe(
    map(product => {
      if (product) {
        return true;
      } else {
        router.navigate(['/products']);
        tuiAlertService
          .open('Product not found...', { label: 'An error happened', status: 'error' })
          .pipe(take(1))
          .subscribe();
          
        return false;
      }
    })
  );
};

