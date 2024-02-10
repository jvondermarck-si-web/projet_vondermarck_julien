import {Component, HostListener} from '@angular/core';
import {TranslocoPipe} from "@ngneat/transloco";
import {TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormInputComponent} from "../../shared/components/form-input/form-input.component";
import {NavItemComponent} from "./components/nav-item/nav-item.component";
import {MyDetailsComponent} from "./components/my-details/my-details.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    TranslocoPipe,
    TuiInputModule,
    FormInputComponent,
    NavItemComponent,
    MyDetailsComponent,
    MyOrdersComponent,
    CommonModule,
  ],
  templateUrl: './account.component.html'
})
export class AccountComponent {

  isMobile = window.innerWidth < 640; // Adjust the breakpoint as needed
  activeTab: 'NavItems' | 'MyDetails' | 'MyOrders' = this.isMobile ? 'NavItems' : 'MyDetails';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
    this.activeTab = this.isMobile ? 'NavItems' : 'MyDetails';
  }

  setActiveTab(tab: 'NavItems' | 'MyDetails' | 'MyOrders'): void {
    this.activeTab = tab;
  }
}
