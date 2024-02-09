import {Component, Input} from '@angular/core';
import {Category} from "../../../../../shared/models/category.interface";
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    TranslocoPipe
  ],
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {

  @Input() category!: Category;

}
