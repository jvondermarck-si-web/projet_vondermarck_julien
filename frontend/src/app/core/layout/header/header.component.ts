import { Component } from '@angular/core';
import {TuiDataListWrapperModule, TuiInputModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {FormControl, ReactiveFormsModule} from '@angular/forms';

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
  ],
  templateUrl: './header.component.html',
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
