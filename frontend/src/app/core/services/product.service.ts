import { Injectable } from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from '../../shared/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _bestSellersProducts = new BehaviorSubject<Product[]>([]);
  private _products = new BehaviorSubject<Product[]>([]);

  constructor(private categoryService: CategoryService) {
    this.categoryService.categories.subscribe((categories: Category[]) => {
      const products = categories.reduce((acc: Product[], category: Category) => {
        return acc.concat(category.products);
      }, []);
      
      this._bestSellersProducts.next(products.filter((product: Product) => product.isBestSeller));
      this._products.next(products);
    });
  }

  get bestSellersProducts() : Observable<Product[]> {
    return this._bestSellersProducts.asObservable();
  }

  get products() : Observable<Product[]> {
    return this._products.asObservable();
  }

  getProductFromId(id: number): Observable<Product | undefined> {
    return this.products.pipe(
      map(products => products.find(product => product.id === id))
    );
  }

}