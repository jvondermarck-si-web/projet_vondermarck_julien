import {Component, Input} from '@angular/core';
import {Category} from "../../../../shared/models/category.interface";
import {TranslocoPipe} from "@ngneat/transloco";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    TranslocoPipe,
    RouterModule
  ],
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {

  @Input() category!: Category;

}
