import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-basket-summary',
  standalone: true,
  imports: [TranslocoModule, TuiSvgModule],
  templateUrl: './basket-summary.component.html'
})
export class BasketSummaryComponent {

}
