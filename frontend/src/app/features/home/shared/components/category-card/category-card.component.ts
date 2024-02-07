import {Component, Input} from '@angular/core';
import {Category} from "../../../../../shared/models/category.interface";

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html'
})
export class CategoryCardComponent {

  @Input() category!: Category;

}
