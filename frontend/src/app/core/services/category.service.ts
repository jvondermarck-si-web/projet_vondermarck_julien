import { Injectable, OnDestroy } from '@angular/core';
import {Category} from "../../shared/models/category.interface";
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories = new BehaviorSubject<Category[]>([]);

  constructor(private http:HttpClient) { 
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(`${environment.API_Endpoint}/categories`).subscribe(categories => {
      this._categories.next(categories);
    });
  }

  get categories() : Observable<Category[]> {
    return this._categories.asObservable();
  }

  getCategoriesFromId(id: number): Observable<Category | undefined> {
    return this.categories.pipe(
      map(categories => categories.find(category => category.id === id))
    );
  }
}
