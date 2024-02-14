import { Component } from '@angular/core';
import {TuiSvgModule} from "@taiga-ui/core";
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TuiSvgModule,
    TranslocoPipe
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

}
