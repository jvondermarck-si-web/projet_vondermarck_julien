import { Component, OnInit, input, output } from '@angular/core';
import { Product } from '../../../../shared/models/product.interface';
import { TuiAlertService, TuiSvgModule } from '@taiga-ui/core';
import { BasketService } from '../../../../core/services/basket.service';
import { TranslocoService } from '@ngneat/transloco';
import { BaseProduct } from '../../../../shared/models/base-product.interface';

@Component({
  selector: 'app-basket-product',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './basket-product.component.html'
})
export class BasketProductComponent implements OnInit {

  private readonly MAX_PRODUCT_QUANTITY = 10;

  baseProduct = input.required<BaseProduct>();
  productQuantity = 1;

  constructor(private basketService: BasketService, private readonly alerts: TuiAlertService, private translocoService: TranslocoService) {}

  ngOnInit() {
    this.productQuantity = this.baseProduct().quantity;
  }

  onRemoveProduct() {
    this.basketService.removeProduct(this.baseProduct().product.id);
  }

  incrementProductQuantity() {
    if (this.productQuantity < this.MAX_PRODUCT_QUANTITY) {
      this.productQuantity++;
      this.basketService.updateProductQuantity(this.baseProduct().product.id, this.productQuantity);
    } else {
      const message = this.translocoService.translate('basket.error-max-product-quantity', { maxQuantity: this.MAX_PRODUCT_QUANTITY });
      this.alerts.open(message, { label: this.translocoService.translate('basket.error-title'), status: 'error' }).subscribe();
    }
  }

  decrementProductQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
      this.basketService.updateProductQuantity(this.baseProduct().product.id, this.productQuantity);
    } else {
      const message = this.translocoService.translate('basket.error-min-product-quantity');
      this.alerts.open(message, { label: this.translocoService.translate('basket.error-title'), status: 'error' }).subscribe();
    }
  }

  get totalProductPrice() {
    return Number(this.baseProduct().product.price * this.productQuantity).toFixed(2);
  }
}
