import { Component, Inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private productSubscription!: Subscription;
  public product!: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private readonly tuiAlertService: TuiAlertService
  ) {}

  ngOnInit(): void {
     // Detect if the id parameter is updated in the URL to reload the component
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.productSubscription = this.productService.getProductFromId(+id).subscribe(product => {
          this.product = product;
          if (!product) this.router.navigate(['/products']).then(() => this.tuiAlertService.open('Product not found...', { label: 'An error happened', status: 'error' }).subscribe());
        });
      } else {
        console.error('No id parameter found in the URL');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  showAddToCartNotification(): void {
    if(this.product) {
      this.tuiAlertService.open(`${this.product.title} has been added successfully.`, { label: 'Added to cart!', status: 'success' }).subscribe();
    }
  }
}
