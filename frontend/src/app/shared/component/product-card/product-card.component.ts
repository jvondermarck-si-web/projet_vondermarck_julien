import {Component, Input} from '@angular/core';
import {Product} from "../../models/product.interface";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  /** Product to display */
  @Input() product!: Product;

}
