import {Component, HostListener, Type} from '@angular/core';
import {TranslocoPipe, TranslocoService} from "@ngneat/transloco";
import {TuiInputModule} from "@taiga-ui/kit";
import {FormInputComponent} from "../../shared/components/form-input/form-input.component";
import {NavItemComponent} from "./components/nav-item/nav-item.component";
import {MyDetailsComponent} from "./components/my-details/my-details.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {CommonModule} from "@angular/common";
import {TabComponent} from "./models/tab-component.interface";
import {TabSectionDetailsName} from "./models/tab-section-details-name.type";
import {Observable} from "rxjs";

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

  /** Mobile breakpoint */
  readonly MOBILE_BREAKPOINT = 640;
  isMobile = window.innerWidth < this.MOBILE_BREAKPOINT;

  /** Tab names */
  readonly TAB_SECTION_NAVIGATION: string = 'Navigation';
  readonly TAB_SECTION_DETAILS: TabSectionDetailsName = 'MyDetails';
  /**
   * Active tab to be displayed in the account page
   * @default 'NavItems' for mobile, 'Section' for desktop
   */
  activeTab = this.isMobile ? this.TAB_SECTION_NAVIGATION : this.TAB_SECTION_DETAILS;

  /**
   * Map of tab components to be displayed in the account page
   * Key: tab name
   * Value: component to be displayed
   * @type {{[p: string]: Type<TabComponent>}}
   * @memberof AccountComponent
   */
  tabSectionComponents: { [key: string]: Type<TabComponent> } = {
    'MyDetails': MyDetailsComponent,
    'MyOrders': MyOrdersComponent,
  };

  /** Map of tab names to titles */
  tabTitles: { [key in string]: Observable<string> };

  constructor(private translocoService: TranslocoService) {
    this.tabTitles = {
      'MyDetails': this.translocoService.selectTranslate('account.my-details'),
      'MyOrders': this.translocoService.selectTranslate('account.my-orders'),
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < this.MOBILE_BREAKPOINT;
    if(!this.isMobile) {
      this.activeTab = this.TAB_SECTION_DETAILS;
    }
  }

  setActiveSectionTab(tab: string): void {
    this.activeTab = tab;
  }

  shouldDisplaySection(section: string): boolean {
    if (section === 'Navigation') {
      return this.activeTab === this.TAB_SECTION_NAVIGATION || !this.isMobile;
    } else if (section === 'Details') {
      return this.activeTab !== this.TAB_SECTION_NAVIGATION || !this.isMobile;
    }
    return false;
  }

}
