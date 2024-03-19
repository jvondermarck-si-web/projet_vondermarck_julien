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
    this._basketProducts.next([...this._basketProducts.getValue(), product]);
    const message = `${product.title} has been added successfully.`;
      this.alerts.open(message, { label: 'Added to cart!', status: 'success' }).subscribe();
  }

  removeProduct(id: number) {
    this._basketProducts.next(this._basketProducts.getValue().filter(product => product.id !== id));
  }

  clearBasket() {
    this._basketProducts.next([]);
  }
}
