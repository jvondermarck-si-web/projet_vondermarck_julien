import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { BasketService } from '../../core/services/basket.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { CommonModule } from '@angular/common';
import { BasketProductComponent } from "./basket-product/basket-product.component";

@Component({
    selector: 'app-basket',
    standalone: true,
    templateUrl: './basket.component.html',
    imports: [TranslocoPipe, RouterLink, CommonModule, BasketProductComponent]
})
export class BasketComponent {

  public declare basketProducts$: Observable<Product[]>;

  constructor(private basketService: BasketService) {
    this.basketProducts$ = this.basketService.basketProducts;
   }

  public removeProduct(id: number) {
    this.basketService.removeProduct(id);
  }

}
