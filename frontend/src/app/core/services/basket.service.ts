import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _basketProducts = new BehaviorSubject<Product[]>([]);

  constructor(private readonly alerts: TuiAlertService) { }

  get basketProducts() {
    return this._basketProducts.asObservable();
  }

  get numberOfProductsInBasket() : Observable<number> {
    return this.basketProducts.pipe(map(products => products.length));
  }

  addProduct(product: Product) {
    const isProductInBasket = this._basketProducts.getValue().find(p => p.id === product.id);

    if (isProductInBasket) {
      const message = `${product.title} is already in the cart.`;
      this.alerts.open(message, { label: 'Already in cart!', status: 'info' }).subscribe();
    } else {
      const message = `${product.title} has been added successfully.`;
      this.alerts.open(message, { label: 'Added to cart!', status: 'success' }).subscribe();
      this._basketProducts.next([...this._basketProducts.getValue(), product]);
    }
   
  }

  removeProduct(id: number) {
    const product = this._basketProducts.getValue().find(product => product.id === id)!;
    const message = `Product ${product.title} has been removed from the cart.`;
    this.alerts.open(message, { label: 'Removed from cart!', status: 'info' }).subscribe();
    this._basketProducts.next(this._basketProducts.getValue().filter(product => product.id !== id));
  }

  clearBasket() {
    this._basketProducts.next([]);
  }
}
