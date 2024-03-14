import {Component, Inject, Input} from '@angular/core';
import {Product} from "../../models/product.interface";
import {TuiAlertService} from "@taiga-ui/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  /** Product to display */
  @Input() product!: Product;
  isHoveringFavoriteBtn = false;

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService, private basketService: BasketService) {}

  addProductToBasket(): void {
    if (this.product?.title) {
      
      this.basketService.addProduct(this.product);

    } else {
      console.error('Product title is missing.'); // Handle the error appropriately.
    }
  }

  toggleFavorite() {
    this.product.isFavorite = !this.product.isFavorite;
    this.isHoveringFavoriteBtn = false;
  }

  showNonFavorite() {
    return (!this.product.isFavorite && !this.isHoveringFavoriteBtn) || (this.product.isFavorite && this.isHoveringFavoriteBtn);
  }
  
  showFavorite() {
    return (this.product.isFavorite && !this.isHoveringFavoriteBtn) || (!this.product.isFavorite && this.isHoveringFavoriteBtn);
  }
  

}
