// basket.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { BaseProduct } from '../models/base-product.interface';
import { AddProduct, RemoveProduct, UpdateProductQuantity, ClearBasket } from '../actions/basket-action';
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

export interface BasketStateModel {
  products: BaseProduct[];
}

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    products: []
  }
})
@Injectable()
export class BasketState {

  constructor(private readonly alerts: TuiAlertService, private translocoService: TranslocoService) { }

  @Selector()
  static getBasketProducts(state: BasketStateModel) {
    return state.products;
  }

  @Selector()
  static totalBasketPrice(state: BasketStateModel) {
    return state.products.reduce((acc, product) => acc + product.product.price * product.quantity, 0).toFixed(2);
  }

  @Selector()
  static numberOfProductsInBasket(state: BasketStateModel) {
    return state.products.length;
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<BasketStateModel>, action: AddProduct) {
    const state = ctx.getState();
    const isProductInBasket = state.products.find(p => p.product.id === action.product.id);

    if (isProductInBasket) {
      const message = this.translocoService.translate('basket.alreadyInCart', { product: action.product.title });
      this.alerts.open(message, { label: this.translocoService.translate('basket.alreadyInCartTitle'), status: 'info' }).subscribe();
    } else {
      const newProduct: BaseProduct = { product: action.product, quantity: 1 };
      ctx.patchState({
        products: [...state.products, newProduct]
      });

      const message = this.translocoService.translate('basket.addedToCart', { product: newProduct.product.title });
      this.alerts.open(message, { label: this.translocoService.translate('basket.addedToCartTitle'), status: 'success' }).subscribe();
    }
  }

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<BasketStateModel>, action: RemoveProduct) {
    const state = ctx.getState();
    const productToRemove = state.products.find(product => product.product.id === action.id)?.product;
    ctx.patchState({
      products: state.products.filter(product => product.product.id !== action.id)
    });

    const message = this.translocoService.translate('basket.removedFromCart', { product: productToRemove!.title });
    this.alerts.open(message, { label: this.translocoService.translate('basket.removedFromCartTitle'), status: 'info' }).subscribe();
  }

  @Action(UpdateProductQuantity)
  updateProductQuantity(ctx: StateContext<BasketStateModel>, action: UpdateProductQuantity) {
    const state = ctx.getState();
    const updatedProducts = state.products.map(product => {
      if (product.product.id === action.id) {
        return { ...product, quantity: action.quantity };
      }
      return product;
    });
    ctx.patchState({
      products: updatedProducts
    });
  }

  @Action(ClearBasket)
  clearBasket(ctx: StateContext<BasketStateModel>) {
    ctx.setState({ products: [] });
  }
}