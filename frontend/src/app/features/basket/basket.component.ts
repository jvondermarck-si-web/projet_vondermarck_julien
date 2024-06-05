import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BasketProductComponent } from "./components/basket-product/basket-product.component";
import { BasketSummaryComponent } from "./components/basket-summary/basket-summary.component";
import { BaseProduct } from '../../shared/models/base-product.interface';
import { Select } from '@ngxs/store';
import { BasketState } from '../../shared/states/basket-state';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-basket',
    standalone: true,
    templateUrl: './basket.component.html',
    imports: [TranslocoPipe, RouterLink, CommonModule, BasketProductComponent, BasketSummaryComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent {

  @Select(BasketState.getBasketProducts) declare basketProducts$: Observable<BaseProduct[]>;
  isAuthenticated$ = this.authService.isAuthenticated;

  constructor(private authService: AuthService) {}
}
