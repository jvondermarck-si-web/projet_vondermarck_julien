import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent {
  @Output() backClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  goBackClick() {
    this.backClicked.emit(true);
  }
}
