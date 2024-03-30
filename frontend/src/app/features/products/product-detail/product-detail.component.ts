import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../shared/actions/basket-action';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  public declare product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product$ = this.productService.getProductFromId(+id)!;
  }

  showAddToCartNotification(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}