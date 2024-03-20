import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _basketProducts = new BehaviorSubject<Product[]>([]);

  constructor(private readonly alerts: TuiAlertService, private translocoService: TranslocoService) { }

  get basketProducts() {
    return this._basketProducts.asObservable();
  }

  get numberOfProductsInBasket() : Observable<number> {
    return this.basketProducts.pipe(map(products => products.length));
  }

  addProduct(product: Product) {
    const isProductInBasket = this._basketProducts.getValue().find(p => p.id === product.id);
  
    if (isProductInBasket) {
      const message = this.translocoService.translate('basket.alreadyInCart', { product: product.title });
      this.alerts.open(message, { label: this.translocoService.translate('basket.alreadyInCartTitle'), status: 'info' }).subscribe();
    } else {
      const message = this.translocoService.translate('basket.addedToCart', { product: product.title });
      this.alerts.open(message, { label: this.translocoService.translate('basket.addedToCartTitle'), status: 'success' }).subscribe();
      this._basketProducts.next([...this._basketProducts.getValue(), product]);
    }
  }
  
  removeProduct(id: number) {
    const product = this._basketProducts.getValue().find(product => product.id === id)!;
    const message = this.translocoService.translate('basket.removedFromCart', { product: product.title });
    this.alerts.open(message, { label: this.translocoService.translate('basket.removedFromCartTitle'), status: 'info' }).subscribe();
    this._basketProducts.next(this._basketProducts.getValue().filter(product => product.id !== id));
  }
  

  clearBasket() {
    this._basketProducts.next([]);
  }
}
