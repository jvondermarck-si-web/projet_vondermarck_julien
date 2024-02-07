import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product.interface";
import {ProductService} from "../../core/services/product.service";
import {ProductCardComponent} from "../../shared/component/product-card/product-card.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public bestSellersProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.bestSellersProducts = this.productService.getBestSellersProducts();
  }
}
