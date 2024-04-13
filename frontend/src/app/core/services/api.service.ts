import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { environment } from '../../../environments/environment';
import { Category } from '../../shared/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public getCategories() : Observable<Category[]> {
      return this.http.get<Category[]>(environment.API_Endpoint + 'categories');
  }
}
