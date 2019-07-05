import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';

import * as prodcutActions from './product.actions';

@Injectable()
export class ProductEffects {

  private getProducts$: Observable<Product[]> = this.productService.getProducts();

  constructor(
    private actions$: Actions,
    private productService: ProductService) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(prodcutActions.ProductActionTypes.Load),
    mergeMap(() =>
      this.getProducts$.pipe(
        map((products) => (new prodcutActions.LoadSuccess(products))),
        catchError(err => of(new prodcutActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProducts$: Observable<Action> = this.actions$.pipe(
    ofType(prodcutActions.ProductActionTypes.UpdateProduct),
    map((action: prodcutActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.UpdateProduct$(product).pipe(
        map(updatedProduct => (new prodcutActions.UpdateProductSuccess(updatedProduct))),
        catchError(err => of(new prodcutActions.UpdateProductFail(err)))
      )
    )
  );

  private UpdateProduct$(productToUpdate: Product): Observable<Product> {
    return this.productService.updateProduct(productToUpdate);
  }
}
