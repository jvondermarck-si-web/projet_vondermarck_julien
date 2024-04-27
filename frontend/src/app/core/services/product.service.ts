import { Injectable, OnDestroy } from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from '../../shared/models/category.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  private _bestSellersProducts = new BehaviorSubject<Product[]>([]);
  private _products = new BehaviorSubject<Product[]>([]);
  private categorySubscription = new Subscription();

  constructor(private categoryService: CategoryService, private http:HttpClient) {
    this.categorySubscription = this.categoryService.categories.subscribe((categories: Category[]) => {
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

  getProductsFromSearch(search: string): Observable<Product[]> {
    let params = new HttpParams().set('search', search);
    return this.http.get<Product[]>(`${environment.API_Endpoint}products/search`, { params: params });  
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

}