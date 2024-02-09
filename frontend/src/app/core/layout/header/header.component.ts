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
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from "@angular/router";
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {NgForOf} from "@angular/common";

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
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiAccordionModule,
    TuiSvgModule,
    NgForOf,
    TuiLinkModule,
    TuiDropdownModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  /** Language form control */
  readonly languages = ['IT', 'EN', 'FR'];
  formLanguage = new FormControl('EN');

  /** Links for the burger menu */
  readonly categoriesLinks = ['Food', 'Cooking', 'Fashion', 'Culture'];
  readonly accountLinks = ['Sign-in', 'Sign-up', 'My account'];
  openBurgerMenu = false;

  /** Dropdown on links */
  isOpenDropdownAccount = false;

  /**
   * Toggles the burger menu (on mobile)
   * @param open - True to open the burger menu, false to close it
   */
  toggleBurgerMenu(open: boolean) {
    this.openBurgerMenu = open;
  }

}
