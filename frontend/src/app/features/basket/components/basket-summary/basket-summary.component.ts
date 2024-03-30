import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiSvgModule } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BasketState } from '../../../../shared/states/basket-state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [TranslocoModule, TuiSvgModule, CommonModule],
  templateUrl: './basket-summary.component.html'
})
export class BasketSummaryComponent {
  @Select(BasketState.totalBasketPrice) declare totalBasketPrice$: Observable<number>;
}
