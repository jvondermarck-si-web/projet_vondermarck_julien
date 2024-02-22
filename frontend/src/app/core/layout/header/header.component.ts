import { Component } from '@angular/core';
import {TuiAccordionModule, TuiDataListWrapperModule, TuiInputModule, TuiSelectModule} from "@taiga-ui/kit";
import {
  TuiDataListModule,
  TuiDropdownModule, TuiHostedDropdownModule,
  TuiLinkModule,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from "@angular/router";
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {CommonModule, NgForOf} from "@angular/common";
import {LanguageSwitcherComponent} from "../../../shared/components/language-switcher/language-switcher.component";
import {TranslocoPipe} from "@ngneat/transloco";
import { SearchProductComponent } from "../../../shared/components/search-product/search-product.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        RouterLink,
        TuiSidebarModule,
        TuiActiveZoneModule,
        TuiAccordionModule,
        TuiSvgModule,
        NgForOf,
        TuiLinkModule,
        TuiDropdownModule,
        TuiDataListModule,
        TuiHostedDropdownModule,
        LanguageSwitcherComponent,
        TranslocoPipe,
        SearchProductComponent,
        CommonModule
    ]
})
export class HeaderComponent {

  /** Links for the burger menu */
  readonly categoriesLinks = ['Food', 'Cooking', 'Fashion', 'Culture'];
  readonly accountLinks = ['Sign-in', 'Sign-up', 'Account'];
  openBurgerMenu = false;
  isUserLoggedIn = false;

  /** Dropdown on links */
  isOpenDropdownAccount = false;

  searchProduct: FormControl = new FormControl('');

  /**
   * Toggles the burger menu (on mobile)
   * @param open - True to open the burger menu, false to close it
   */
  toggleBurgerMenu(open: boolean) {
    this.openBurgerMenu = open;
  }

}
