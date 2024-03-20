import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiSvgModule } from '@taiga-ui/core';
import { BasketService } from '../../../../core/services/basket.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [TranslocoModule, TuiSvgModule, CommonModule],
  templateUrl: './basket-summary.component.html'
})
export class BasketSummaryComponent {
  declare totalBasketPrice$ : Observable<number>;

  constructor(private basketService: BasketService) {
    this.totalBasketPrice$ = this.basketService.totalBasketPrice;
  }

}
