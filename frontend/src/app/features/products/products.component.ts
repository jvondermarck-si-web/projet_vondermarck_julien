import { Component } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDataListModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { TuiAccordionModule, TuiFilterModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { Category } from '../../shared/models/category.interface';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    imports: [
      ProductCardComponent, 
      CommonModule, 
      TranslocoPipe, 
      TuiSvgModule, 
      ReactiveFormsModule,
      TuiAccordionModule,
      TuiTextfieldControllerModule,
      TuiDataListModule,
      FormsModule,
      TuiMultiSelectModule,
      TuiFilterModule,
      TuiSidebarModule,
      TuiActiveZoneModule,
    ]
})
export class ProductsComponent {

  public products: Product[] = [];
  public searchText: string | null = null; 

  public formCategoryFilterSelected: FormControl<Category[]>= new FormControl();
  public declare categoriesList$: Observable<Category[]>;

  public openFilterMenu = false;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {} 

  ngOnInit(): void {
    this.categoriesList$ = this.categoryService.categories;

    // Subscribe to the products observable and the query params
    combineLatest([
      this.productService.products,
      this.route.queryParams,
      this.categoriesList$
    ]).subscribe(([products, queryParams, categories]) => {
      const search = queryParams['search'];
      const categoryIds = queryParams['categories'] ? queryParams['categories'].split(',').map(Number) : [];

      // Initialize searchText based on the search query param
      this.searchText = search;

      this.products = products.filter(product => {
        if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
        if (categoryIds.length > 0 && !categoryIds.includes(product.categoryID)) {
          return false;
        }
        return true;
      });

      // Initialize formCategoryFilterSelected based on the categories query param
      if (categoryIds.length > 0) {
        const selectedCategories = categories.filter(category => categoryIds.includes(category.id));
        this.formCategoryFilterSelected.setValue(selectedCategories, { emitEvent: false });
      }
    });


    this.formCategoryFilterSelected.valueChanges.subscribe((selectedCategories: Category[]) => {
      // Get the IDs of the selected categories
      const selectedCategoryIds = selectedCategories.map(category => category.id);
      const categoryParam: string | null = selectedCategories.length > 0 ? selectedCategoryIds.join(',') : null;

      // Add the selected category IDs to the URL as query params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { categories: categoryParam },
        queryParamsHandling: 'merge' // preserve the current query params
      });
    });
    
  }

  deleteFilter(category: Category) {
    this.formCategoryFilterSelected.setValue(this.formCategoryFilterSelected.value.filter((value: Category) => value.id !== category.id));
  }

  toggleFilterMenu(open: boolean) {
    console.log(open);
    this.openFilterMenu = open;
  }
}
