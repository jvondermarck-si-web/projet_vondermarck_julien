import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { ActivatedRoute } from '@angular/router';
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

  public product$!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private readonly tuiAlertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product$ = this.productService.getProductFromId(+id)!;
  }

  showAddToCartNotification(product: Product): void {
    this.tuiAlertService.open(`${product.title} has been added successfully.`, { label: 'Added to cart!', status: 'success' }).subscribe();
  }
}