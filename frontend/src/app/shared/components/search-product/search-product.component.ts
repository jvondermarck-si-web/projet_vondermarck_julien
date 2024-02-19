import { CommonModule } from '@angular/common';
import { Component, Optional } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../models/product.interface';
import { Subscription } from 'rxjs';
import { TuiDataListWrapperModule, TuiInputModule } from '@taiga-ui/kit';
import { TranslocoPipe } from '@ngneat/transloco';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { HighlightPipe } from '../../pipes/highlight.pipe';

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
    HighlightPipe
  ],
  templateUrl: './search-product.component.html'
})
export class SearchProductComponent {
  private productUpdateSubscription!: Subscription;

  public productSearchControl = new FormControl('');
  public filteredProducts: Product[] = [];
  public allProducts: Product[] = [];
  public showProductList : boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Subscribe to the products observable
    this.productUpdateSubscription = this.productService.products.subscribe(products => this.allProducts = products);

    // Subscribe to the value changes of the product search control and filter the products
    this.productSearchControl.valueChanges.subscribe((searchText) => {
      this.filteredProducts = [];
      this.showProductList = false;

      if(searchText !== null && searchText.length > 1) {
        this.showProductList = true;
        this.filteredProducts = this.allProducts.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productUpdateSubscription) {
      this.productUpdateSubscription.unsubscribe();
    }
  }

  onProductSelected(product: Product) {
    // TODO: display the selected product in the UI
    //this.productSearchControl.setValue(product.title);
    this.productSearchControl.reset();
  }
}
