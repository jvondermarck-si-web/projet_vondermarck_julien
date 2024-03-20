import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';
import { TuiSvgModule } from '@taiga-ui/core';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-basket-product',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './basket-product.component.html'
})
export class BasketProductComponent {
  product = input.required<Product>();
  productQuantity = 1;

  constructor(private basketService: BasketService) { }

  onRemoveProduct() {
    this.basketService.removeProduct(this.product().id);
  }

  incrementProductQuantity() {
    this.productQuantity++;
  }

  decrementProductQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }
}
