import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardFormComponent } from './components/card-form/card-form.component';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CardDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }