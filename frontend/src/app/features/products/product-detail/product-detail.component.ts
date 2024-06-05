import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../shared/actions/basket-action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public declare product$: Observable<Product | undefined>;
  private productControlSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.productControlSubscription = this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.product$ = this.productService.getProductFromId(id)!;
    });
  }

  ngOnDestroy(): void {
    this.productControlSubscription.unsubscribe();
  }

  showAddToCartNotification(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}