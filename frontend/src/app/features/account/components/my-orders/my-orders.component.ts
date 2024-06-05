import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TabComponent} from "../../models/tab-component.interface";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements TabComponent {

}
