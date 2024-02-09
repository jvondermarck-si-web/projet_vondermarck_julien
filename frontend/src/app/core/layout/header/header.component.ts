import { Component } from '@angular/core';
import {TuiAccordionModule, TuiDataListWrapperModule, TuiInputModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiLinkModule, TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
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

  /** Language form control */
  readonly languages = ['IT', 'EN', 'FR'];
  formLanguage = new FormControl();

  /** Links for the burger menu */
  readonly categoriesLinks = ['Food', 'Cooking', 'Fashion', 'Culture'];
  readonly accountLinks = ['Sign-in', 'Sign-up', 'My account'];
  openBurgerMenu = false;

  constructor() {
    this.formLanguage.setValue('EN');
  }

  toggleBurgerMenu(open: boolean) {
    this.openBurgerMenu = open;
  }

}
