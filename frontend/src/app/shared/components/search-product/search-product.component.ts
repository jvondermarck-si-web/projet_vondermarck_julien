import { CommonModule } from '@angular/common';
import { Component, Optional } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../models/product.interface';
import { Observable, Subscription, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
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
    // Subscribe to the product search control value changes
    this.productControlSubscription = this.productSearchControl.valueChanges.pipe(
      debounceTime(300), // reduce the number of API calls
      distinctUntilChanged() // only emit when the current value is different than the last
    ).subscribe((searchControlValue) => {
      this.showProductList = false;

      if(searchControlValue && searchControlValue.length > this.MIN_SEARCH_LENGTH) {
        this.showProductList = true;
        this.filteredProducts = this.productService.getProductsFromSearch(searchControlValue);
      }
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
