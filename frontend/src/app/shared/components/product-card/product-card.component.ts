import {Component, Inject, Input} from '@angular/core';
import {Product} from "../../models/product.interface";
import {TuiAlertService} from "@taiga-ui/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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


  /**
   * Constructor
   * @param alerts - Service to display notifications
   */
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  /**
   * Displays a notification when a product is added to the cart.
   */
  showAddToCartNotification(): void {
    if (this.product?.title) {
      const message = `${this.product.title} has been added successfully.`;
      this.alerts.open(message, { label: 'Added to cart!', status: 'success' }).subscribe();
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
