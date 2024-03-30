import { Product } from '../models/product.interface';

export class AddProduct {
  static readonly type = '[Basket] Add Product';
  constructor(public product: Product) {}
}

export class RemoveProduct {
  static readonly type = '[Basket] Remove Product';
  constructor(public id: number) {}
}

export class UpdateProductQuantity {
  static readonly type = '[Basket] Update Product Quantity';
  constructor(public id: number, public quantity: number) {}
}

export class ClearBasket {
  static readonly type = '[Basket] Clear Basket';
}