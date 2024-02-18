import { Component, Inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { TuiAlertService } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.product$ = this.productService.getProduct(+id);
      this.product$.subscribe(product => {
        if (!product) {
          this.router.navigate(['/products']);
        }
      });
    } else {
      console.error('Error getting product.'); // Handle the error appropriately.
      this.router.navigate(['/']);
      this.alerts.open('Error getting product.', { label: 'Error', status: 'error' }).subscribe();
    }
  }

  /**
   * Displays a notification when a product is added to the cart.
   */
  showAddToCartNotification(): void {
    if(this.product$) {
      this.product$.subscribe(product => {
        if (product?.title) {
          const message = `${product.title} has been added successfully.`;
          this.alerts.open(message, { label: 'Added to cart!', status: 'success' }).subscribe();
        } else {
          console.error('Product title is missing.'); // Handle the error appropriately.
        }
      });
    }
  }
  
}

