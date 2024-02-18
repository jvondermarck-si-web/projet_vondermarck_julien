import { ViewportScroller } from '@angular/common';
import { Directive } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appScrollToTop]',
  standalone: true,
})
export class ScrollToTopDirective {
  constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      viewportScroller.scrollToPosition([0, 0]);
    });
  }
}