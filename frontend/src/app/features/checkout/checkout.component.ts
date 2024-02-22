import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [TranslocoPipe, RouterLink],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

}
