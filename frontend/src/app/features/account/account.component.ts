import { Component } from '@angular/core';
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

  activeTab: string = 'MyDetails';

}
