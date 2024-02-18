import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    imports: [ProductCardComponent, CommonModule, TranslocoPipe]
})
export class ProductsComponent {

  public products: Product[] = [];
  private productSubscription!: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.products.subscribe(products => this.products = products);
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
