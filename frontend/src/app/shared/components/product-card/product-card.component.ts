import {Component, Inject, Input} from '@angular/core';
import {Product} from "../../models/product.interface";
import {TuiAlertService} from "@taiga-ui/core";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  /** Product to display */
  @Input() product!: Product;

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

}
