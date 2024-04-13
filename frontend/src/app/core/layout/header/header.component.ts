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
import { Observable, Subject, takeUntil } from 'rxjs';
import { BasketState } from '../../../shared/states/basket-state';
import { Select } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';

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
  readonly accountLinks = ['account', 'sign-in', 'sign-up'];
  openBurgerMenu = false;
  isUserAuthenticated$ = this.authService.isAuthenticated;
  user$ = this.authService.user;

  /** Dropdown on links */
  isOpenDropdownAccount = false;

  searchProduct: FormControl = new FormControl('');

  @Select(BasketState.numberOfProductsInBasket) declare numberOfProductsInBasket$: Observable<number>;

  animate = false;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.numberOfProductsInBasket$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.animate = true;

        // Remove the animation class after a delay
        setTimeout(() => this.animate = false, 4000); 
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Toggles the burger menu (on mobile)
   * @param open - True to open the burger menu, false to close it
   */
  toggleBurgerMenu(open: boolean) {
    this.openBurgerMenu = open;
  }

}
