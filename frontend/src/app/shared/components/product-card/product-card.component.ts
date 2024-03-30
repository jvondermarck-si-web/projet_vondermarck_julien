import {Component, Input} from '@angular/core';
import {Product} from "../../models/product.interface";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../actions/basket-action';

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

  constructor(private store: Store) {}

  addProductToBasket(): void {
    if (this.product?.title) {
      
      this.store.dispatch(new AddProduct(this.product));

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
