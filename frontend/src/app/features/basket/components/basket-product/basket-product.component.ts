import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, input } from '@angular/core';
import { TuiAlertService, TuiSvgModule } from '@taiga-ui/core';
import { TranslocoService } from '@ngneat/transloco';
import { BaseProduct } from '../../../../shared/models/base-product.interface';
import { Store } from '@ngxs/store';
import { RemoveProduct, UpdateProductQuantity } from '../../../../shared/actions/basket-action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-basket-product',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './basket-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketProductComponent implements OnInit, OnDestroy {

  private readonly MAX_PRODUCT_QUANTITY = 10;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  baseProduct = input.required<BaseProduct>();
  productQuantity = 1;

  constructor(private store: Store, private readonly alerts: TuiAlertService, private translocoService: TranslocoService) {}

  ngOnInit() {
    this.productQuantity = this.baseProduct().quantity;
  }

  onRemoveProduct() {
    this.store.dispatch(new RemoveProduct(this.baseProduct().product.id));
  }

  incrementProductQuantity() {
    if (this.productQuantity < this.MAX_PRODUCT_QUANTITY) {
      this.productQuantity++;
      this.store.dispatch(new UpdateProductQuantity(this.baseProduct().product.id, this.productQuantity));
    } else {
      const message = this.translocoService.translate('basket.error-max-product-quantity', { maxQuantity: this.MAX_PRODUCT_QUANTITY });

      this.alerts.open(message, { label: this.translocoService
        .translate('basket.error-title'), status: 'error' })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe();
    }
  }

  decrementProductQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
      this.store.dispatch(new UpdateProductQuantity(this.baseProduct().product.id, this.productQuantity));
    } else {
      const message = this.translocoService.translate('basket.error-min-product-quantity');
      this.alerts
        .open(message, { label: this.translocoService.translate('basket.error-title'), status: 'error' })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe();
    }
  }

  get totalProductPrice() {
    return Number(this.baseProduct().product.price * this.productQuantity).toFixed(2);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
