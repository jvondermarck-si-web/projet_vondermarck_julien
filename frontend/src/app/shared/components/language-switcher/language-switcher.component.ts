import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {TuiDataListWrapperModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiFlagPipeModule, TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';

interface Language {
  lang: string;
  iso: TuiCountryIsoCode;
}


@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiFlagPipeModule,
    TuiPrimitiveTextfieldModule
  ],
  templateUrl: './language-switcher.component.html'
})
export class LanguageSwitcherComponent {

  languages: Language[] = [
    { lang: 'EN', iso: TuiCountryIsoCode.GB },
    { lang: 'IT', iso: TuiCountryIsoCode.IT },
    { lang: 'FR', iso: TuiCountryIsoCode.FR },
  ];

  readonly DEFAULT_LANGUAGE = this.languages[0];


  formLanguage = new FormControl(this.getLanguage(localStorage.getItem('appLanguage')));

  constructor(private translocoService: TranslocoService) {
    this.translocoService.setActiveLang(this.formLanguage.value!.lang.toLowerCase());

    this.formLanguage.valueChanges.subscribe((selectedLanguage: Language | null) => {
      if (selectedLanguage) {
        this.translocoService.setActiveLang(selectedLanguage.lang.toLowerCase());
        localStorage.setItem('appLanguage', selectedLanguage.lang);
      }
    });
  }

  getLanguage(lang: string | null): Language {
    return this.languages.find(language => language.lang === lang) || this.DEFAULT_LANGUAGE;
  }
}
