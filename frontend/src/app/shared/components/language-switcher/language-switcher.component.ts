import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {TuiDataListWrapperModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './language-switcher.component.html'
})
export class LanguageSwitcherComponent {

  readonly languages = ['IT', 'EN', 'FR'];
  formLanguage = new FormControl(localStorage.getItem('appLanguage') || 'EN');

  constructor(private translocoService: TranslocoService) {
    this.translocoService.setActiveLang(this.formLanguage.value!.toLowerCase());

    this.formLanguage.valueChanges.subscribe(selectedLanguage => {
      this.translocoService.setActiveLang(selectedLanguage!.toLowerCase());
      localStorage.setItem('appLanguage', selectedLanguage!);
    });
  }
}
