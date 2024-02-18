import { Injectable } from '@angular/core';
import {Category} from "../../shared/models/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    {
      name: "Food",
      image: "assets/img/categories/category_food.png",
    },
    {
      name: "Cooking",
      image: "assets/img/categories/category_kitchen.png",
    },
    {
      name: "Fashion",
      image: "assets/img/categories/category_fashion.png",
    },
    {
      name: "Culture",
      image: "assets/img/categories/category_culture.png",
    }
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}
