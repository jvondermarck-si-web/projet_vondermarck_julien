import { Component } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    imports: [ProductCardComponent, CommonModule, TranslocoPipe]
})
export class ProductsComponent {

  public products: Product[] = [];
  private productSubscription!: Subscription;
  public searchText: string | null = null; // Add this line

  constructor(private productService: ProductService, private route: ActivatedRoute) { } // Inject the ActivatedRoute

  ngOnInit(): void {
    // Subscribe to the products observable and the query params
    combineLatest([
      this.productService.products,
      this.route.queryParams
    ]).subscribe(([products, queryParams]) => {
      const search = queryParams['search'];
      this.searchText = search;
      if (search) {
        this.products = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
      } else {
        this.products = products;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
