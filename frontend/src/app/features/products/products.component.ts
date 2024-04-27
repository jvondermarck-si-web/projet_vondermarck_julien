import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
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
export class ProductsComponent implements OnDestroy {

  private subscriptionFormCategory: Subscription = new Subscription();

  public declare categoriesList$: Observable<Category[]>;
  public declare products$: Observable<Product[]>;

  public searchText: string | null = null;
  public formCategoryFilterSelected: FormControl<Category[]> = new FormControl();

  public openFilterMenu = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesList$ = this.categoryService.categories;

    this.products$ = combineLatest([
      this.productService.products,
      this.route.queryParams,
      this.categoriesList$,
    ]).pipe(
      map(([products, queryParams, categories]) =>
        this.updateProducts(products, queryParams, categories)
      )
    );

    this.subscriptionFormCategory = this.formCategoryFilterSelected.valueChanges
      .pipe(map((selectedCategories) => this.updateCategoryQueryParam(selectedCategories)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptionFormCategory.unsubscribe();
  }

  private updateProducts(products: Product[], queryParams: any, categories: Category[]): Product[] {
    const search = queryParams['search'];
    const categoryIds = queryParams['categories']
      ? queryParams['categories'].split(',').map(Number)
      : [];

    this.searchText = search;
    
    this.formCategoryFilterSelected.setValue(
      categories.filter((category) => categoryIds.includes(category.id))
    );
    
    return products.filter((product) => {
      if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (categoryIds.length > 0 && !categoryIds.includes(product.categoryID)) {
        return false;
      }
      return true;
    });


  }

  private updateCategoryQueryParam(selectedCategories: Category[]) {
    const selectedCategoryIds = selectedCategories.map((category) => category.id);
    const categoryParam: string | null =
      selectedCategories.length > 0 ? selectedCategoryIds.join(',') : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categories: categoryParam },
      queryParamsHandling: 'merge',
    });
  }

  deleteFilter(category: Category) {
    this.formCategoryFilterSelected.setValue(
      this.formCategoryFilterSelected.value.filter(
        (value: Category) => value.id !== category.id
      )
    );
  }

  toggleFilterMenu(open: boolean) {
    this.openFilterMenu = open;
  }
}
