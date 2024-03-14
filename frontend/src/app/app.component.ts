import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./core/layout/header/header.component";
import {FooterComponent} from "./core/layout/footer/footer.component";
import { ScrollToTopDirective } from "./core/directives/scroll-to-top.directive";
import { CardModule } from "./modules/card/card.module";
import { HideCardPipe } from "./modules/card/pipes/hide-card.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, HeaderComponent, FooterComponent, ScrollToTopDirective, CardModule],
  templateUrl: './app.component.html',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'livalie';
}
