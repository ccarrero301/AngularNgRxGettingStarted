import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';

import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {

  private getProducts$: Observable<Product[]> = this.productService.getProducts();

  constructor(
    private actions$: Actions,
    private productService: ProductService) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(() =>
      this.getProducts$.pipe(
        map((products) => (new productActions.LoadSuccess(products))),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.UpdateProduct$(product).pipe(
        map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );

  @Effect()
  createProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.CreateProduct$(product).pipe(
        map(createdProduct => (new productActions.CreateProductSuccess(createdProduct))),
        catchError(err => of(new productActions.CreateProductFail(err)))
      )
    )
  );

  @Effect()
  deleteProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.DeleteProduct$(productId).pipe(
        map(() => (new productActions.DeleteProductSuccess())),
        catchError(err => of(new productActions.DeleteProductFail(err)))
      )
    )
  );

  private UpdateProduct$(productToUpdate: Product): Observable<Product> {
    return this.productService.updateProduct(productToUpdate);
  }

  private CreateProduct$(productToUpdate: Product): Observable<Product> {
    return this.productService.createProduct(productToUpdate);
  }

  private DeleteProduct$(productToDeleteId: number): Observable<{}> {
    return this.productService.deleteProduct(productToDeleteId);
  }
}
