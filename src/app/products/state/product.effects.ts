import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Product } from '../product';
import { ProductService } from '../product.service';

import * as prodcutActions from './product.actions';

@Injectable()
export class ProductEffects {

  private getProducts$: Observable<Product[]> =  this.productService.getProducts();

  constructor(
    private actions$: Actions,
    private productService: ProductService) { }

  @Effect()
  loadProducts$ = this.actions$.pipe(ofType(prodcutActions.ProductActionTypes.Load),
    mergeMap((action: prodcutActions.Load) =>
      this.getProducts$.pipe(map((products: Product[]) => (new prodcutActions.LoadSuccess(products))),
                             catchError(err => of(new prodcutActions.LoadFail(err))))
      )
  );
}
