import { NgModule } from "@angular/core";
import { CardFormComponent } from "./components/card-form/card-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardRoutingModule } from "./card.routes";
import { CardListComponent } from "./components/card-list/card-list.component";
import { TuiInputCVCModule, TuiInputCardModule, TuiInputExpireModule } from "@taiga-ui/addon-commerce";
import { TuiInputModule, TuiInputNumberModule } from "@taiga-ui/kit";
import { TuiGroupModule, TuiRootModule } from "@taiga-ui/core";
import { CommonModule } from "@angular/common";
import { CardDashboardComponent } from "./components/card-dashboard/card-dashboard.component";
import { HideCardPipe } from "./pipes/hide-card.pipe";


@NgModule({
  declarations: [CardFormComponent, CardListComponent, CardDashboardComponent,HideCardPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardRoutingModule,
    FormsModule,
    TuiInputCardModule,
    TuiInputCVCModule,
    TuiInputExpireModule,
    TuiInputNumberModule,
    TuiInputModule,
    TuiRootModule,
    TuiGroupModule,
  ],
  exports: [CardDashboardComponent, HideCardPipe]
})
export class CardModule { }



