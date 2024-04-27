import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./core/layout/header/header.component";
import {FooterComponent} from "./core/layout/footer/footer.component";
import { ScrollToTopDirective } from "./core/directives/scroll-to-top.directive";
import { CardModule } from "./modules/card/card.module";
import { Subject } from "rxjs";
import { LoaderService } from "./core/services/loader.service";
import { CommonModule } from "@angular/common";
import { TranslocoPipe } from "@ngneat/transloco";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, HeaderComponent, FooterComponent, ScrollToTopDirective, CardModule, CommonModule, TranslocoPipe],
  templateUrl: './app.component.html',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent implements AfterViewInit {
  title = 'livalie';

  isLoading: Subject<boolean> = this.loader.isLoading;

  constructor(private loader: LoaderService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Change the model and trigger change detection here
    this.cdr.detectChanges();
  }
}
