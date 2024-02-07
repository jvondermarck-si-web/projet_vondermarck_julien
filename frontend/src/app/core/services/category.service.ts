import { Injectable } from '@angular/core';
import {Category} from "../../shared/models/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    {
      name: "Food",
      image: "assets/img/category_food.svg",
    },
    {
      name: "Cooking",
      image: "assets/img/category_kitchen.svg",
    },
    {
      name: "Fashion",
      image: "assets/img/category_fashion.svg",
    },
    {
      name: "Culture",
      image: "assets/img/category_culture.svg",
    }
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}
