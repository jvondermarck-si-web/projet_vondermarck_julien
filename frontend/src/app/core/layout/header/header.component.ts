import { Component } from '@angular/core';
import {TuiDataListWrapperModule, TuiInputModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiPrimitiveTextfieldModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styles : [`
    .link {
      height: auto;
      width: auto;
      position: relative;
      display: block;
    }
    .link img {
      width: 100%;
      height: 100%;
    }
  `]
})
export class HeaderComponent {
  readonly languages = [
    'IT',
    'EN',
    'FR',
  ];
  formLanguage = new FormControl();

  constructor() {
    this.formLanguage.setValue('EN');
  }

}
