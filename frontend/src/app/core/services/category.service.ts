import { Injectable } from '@angular/core';
import {Category} from "../../shared/models/category.interface";
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories = new BehaviorSubject<Category[]>([]);

  constructor(private apiService: ApiService) {
    this.apiService.getCategories().subscribe((categories: Category[]) => {
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
