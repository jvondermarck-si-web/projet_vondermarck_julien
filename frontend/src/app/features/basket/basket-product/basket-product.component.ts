import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { TuiAlertService, TuiSvgModule } from '@taiga-ui/core';
import { BasketService } from '../../../core/services/basket.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-basket-product',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './basket-product.component.html'
})
export class BasketProductComponent {
  product = input.required<Product>();
  productQuantity = 1;
  private readonly MAX_PRODUCT_QUANTITY = 10;

  constructor(private basketService: BasketService, private readonly alerts: TuiAlertService, private translocoService: TranslocoService) { }

  onRemoveProduct() {
    this.basketService.removeProduct(this.product().id);
  }

  incrementProductQuantity() {
    if (this.productQuantity < this.MAX_PRODUCT_QUANTITY) {
      this.productQuantity++;
    } else {
      const message = this.translocoService.translate('basket.error-max-product-quantity', { maxQuantity: this.MAX_PRODUCT_QUANTITY });
      this.alerts.open(message, { label: this.translocoService.translate('basket.error-title'), status: 'error' }).subscribe();
    }
  }

  decrementProductQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    } else {
      const message = this.translocoService.translate('basket.error-min-product-quantity');
      this.alerts.open(message, { label: this.translocoService.translate('basket.error-title'), status: 'error' }).subscribe();
    }
  }

  get totalProductPrice() {
    return Number(this.product().price * this.productQuantity).toFixed(2);
  }
}
