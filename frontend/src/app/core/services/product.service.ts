import { Injectable } from '@angular/core';
import {Product} from "../../shared/models/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private bestSellersProducts: Product[] = [
    {
      image: 'assets/img/caputo.svg',
      title: 'Caputo Flour 1kg Dede Pizzeria Mulino Di Napoli 1924',
      info: '1Kg of flour',
      price: '12€'
    },
    {
      image: 'assets/img/olive_oil.svg',
      title: 'Olive oil',
      info: '60ml',
      price: '2.99€'
    },
    {
      image: 'assets/img/italian_tshirt.svg',
      title: 'T-Shirt Everybody Loves Italian Girls',
      info: 'Size from S to XL',
      price: '19.99€'
    },
    {
      image: 'assets/img/coffee.svg',
      title: 'Italian coffee pot',
      info: '20ml',
      price: '4.99€'
    }
  ];

  getBestSellersProducts(): Product[] {
    return this.bestSellersProducts;
  }

  constructor() { }
}
