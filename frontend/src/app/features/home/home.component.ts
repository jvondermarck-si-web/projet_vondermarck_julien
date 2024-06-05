import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import {ProductService} from "../../core/services/product.service";
import {CategoryService} from "../../core/services/category.service";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {CommonModule} from "@angular/common";
import {Category} from "../../shared/models/category.interface";
import {CategoryCardComponent} from "./components/category-card/category-card.component";
import {TranslocoPipe} from "@ngneat/transloco";
import { Observable, Subscription } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  categories$: Observable<Category[]>;
  bestSellersProducts$: Observable<Product[]>

  constructor(private productService: ProductService, private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.categories;
    this.bestSellersProducts$ = this.productService.bestSellersProducts;
  }
}