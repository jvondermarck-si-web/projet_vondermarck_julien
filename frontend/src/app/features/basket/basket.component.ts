import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [TranslocoPipe, RouterLink],
  templateUrl: './basket.component.html'
})
export class BasketComponent {

}
