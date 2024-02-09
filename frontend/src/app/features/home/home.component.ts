import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import {ProductService} from "../../core/services/product.service";
import {CategoryService} from "../../core/services/category.service";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {CommonModule} from "@angular/common";
import {Category} from "../../shared/models/category.interface";
import {CategoryCardComponent} from "./shared/components/category-card/category-card.component";
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        ProductCardComponent,
        CommonModule,
        CategoryCardComponent,
        TranslocoPipe,
    ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public bestSellersProducts: Product[] = [];
  public categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Retrieve the different products and categories
    this.bestSellersProducts = this.productService.getBestSellersProducts();
    this.categories = this.categoryService.getCategories();
  }
}
