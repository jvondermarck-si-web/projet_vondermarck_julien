import { CommonModule } from '@angular/common';
import { Component, Optional } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../models/product.interface';
import { Observable, Subscription, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { TuiDataListWrapperModule, TuiInputModule } from '@taiga-ui/kit';
import { TranslocoPipe } from '@ngneat/transloco';
import { TuiDataListModule, TuiHostedDropdownModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule, 
    TuiInputModule, 
    TuiDataListWrapperModule, 
    ReactiveFormsModule, 
    TranslocoPipe, 
    TuiTextfieldControllerModule,
    RouterLink,
    HighlightPipe,
    TuiHostedDropdownModule,
    TuiDataListModule
  ],
  templateUrl: './search-product.component.html'
})
export class SearchProductComponent {

  private productControlSubscription!: Subscription;

  public productSearchControl = new FormControl('');
  public declare filteredProducts: Observable<Product[]>;
  public showProductList : boolean = false;
  readonly MIN_SEARCH_LENGTH : number = 1;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.productSearchControl.valueChanges.pipe(
      debounceTime(300), // reduce the number of API calls
      distinctUntilChanged(), // only emit when the current value is different than the last
      switchMap((searchControlValue) => { // switch to a new Observable each time the search value changes
        if(searchControlValue && searchControlValue.length > this.MIN_SEARCH_LENGTH) {
          return this.productService.getProductsFromSearch(searchControlValue);
        } else {
          return of([]); // Return an Observable of an empty array when no search is performed
        }
      })
    ).subscribe((products: Product[]) => {
      this.showProductList = products.length > 0;
      this.filteredProducts = of(products); // Assign the filtered products to the Observable
    });
  }

  navigateToProductsPageWithQueryParam(): void {
    const searchText = this.productSearchControl.value;
    if (searchText) {
      this.showProductList = false;
      this.router.navigate(['/products'], { 
        queryParams: { search: searchText }, 
        queryParamsHandling: 'merge' // preserve the current query params
      });    
    }
  }

  ngOnDestroy(): void {
    this.productControlSubscription.unsubscribe();
  }

  onProductSelected(product: Product) {
    // TODO: display the selected product in the UI
    //this.productSearchControl.setValue(product.title);
    this.productSearchControl.reset('', { emitEvent: false });

  }
}
