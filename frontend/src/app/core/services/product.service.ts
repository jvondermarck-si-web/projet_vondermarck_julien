import { Injectable } from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _bestSellersProducts = new BehaviorSubject<Product[]>([]);
  private _products = new BehaviorSubject<Product[]>([]);

  get bestSellersProducts() {
    return this._bestSellersProducts.asObservable();
  }

  get products() {
    return this._products.asObservable();
  }

  constructor(private apiService: ApiService) {
    this.apiService.getProducts().subscribe((products: Product[]) => {
      this._bestSellersProducts.next(products.filter((product: Product) => product.isBestSeller));
      this._products.next(products);
    });
  }
}