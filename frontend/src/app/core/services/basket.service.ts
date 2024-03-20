import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from '@ngneat/transloco';
import { BaseProduct } from '../../shared/models/base-product.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _basketProducts = new BehaviorSubject<BaseProduct[]>([]);

  constructor(private readonly alerts: TuiAlertService, private translocoService: TranslocoService) { }

  get basketProducts() {
    return this._basketProducts.asObservable();
  }

  get numberOfProductsInBasket() : Observable<number> {
    return this.basketProducts.pipe(map(products => products.length));
  }

  get totalBasketPrice() : Observable<number> {
    return this.basketProducts.pipe(map(products => products.reduce((acc, product) => acc + product.product.price * product.quantity, 0)));
  }

  addProduct(product: Product) {
    const isProductInBasket = this._basketProducts.getValue().find(p => p.product.id === product.id);
  
    if (isProductInBasket) {
      const message = this.translocoService.translate('basket.alreadyInCart', { product: product.title });
      this.alerts.open(message, { label: this.translocoService.translate('basket.alreadyInCartTitle'), status: 'info' }).subscribe();
    } else {
      const message = this.translocoService.translate('basket.addedToCart', { product: product.title });
      this.alerts.open(message, { label: this.translocoService.translate('basket.addedToCartTitle'), status: 'success' }).subscribe();
      const newProduct: BaseProduct = { product, quantity: 1 };
      this._basketProducts.next([...this._basketProducts.getValue(), newProduct]);
    }
  }
  
  removeProduct(id: number) {
    const baseProduct = this._basketProducts.getValue().find(base => base.product.id === id)!;
    const message = this.translocoService.translate('basket.removedFromCart', { product: baseProduct.product.title });
    this.alerts.open(message, { label: this.translocoService.translate('basket.removedFromCartTitle'), status: 'info' }).subscribe();
    this._basketProducts.next(this._basketProducts.getValue().filter(baseProduct => baseProduct.product.id !== id));
  }

  updateProductQuantity(id: number, quantity: number) {
    const baseProduct = this._basketProducts.getValue().find(base => base.product.id === id)!;
    const updatedProduct: BaseProduct = { product: baseProduct.product, quantity };
    const updatedProducts = this._basketProducts.getValue().map(baseProduct => baseProduct.product.id === id ? updatedProduct : baseProduct);
    this._basketProducts.next(updatedProducts);
  }
  

  clearBasket() {
    this._basketProducts.next([]);
  }
}
