import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import {ProductService} from "../../core/services/product.service";
import {CategoryService} from "../../core/services/category.service";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {CommonModule} from "@angular/common";
import {Category} from "../../shared/models/category.interface";
import {CategoryCardComponent} from "./components/category-card/category-card.component";
import {TranslocoPipe} from "@ngneat/transloco";
import { Subscription } from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {

  public bestSellersProducts: Product[] = [];
  public categories: Category[] = [];

  private productSubscription!: Subscription;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.bestSellersProducts.subscribe(products => this.bestSellersProducts = products);
    this.categories = this.categoryService.getCategories();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}