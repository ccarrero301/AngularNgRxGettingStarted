import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
  ToogleProductCode = '[Product] Toogle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail'
}

export class ToogleProductCode implements Action {
  readonly type = ProductActionTypes.ToogleProductCode;

  constructor(public payload: boolean) { }
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) { }
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) { }
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: string) { }
}

export type ProductActions = ToogleProductCode |
  SetCurrentProduct |
  ClearCurrentProduct |
  InitializeCurrentProduct |
  Load |
  LoadSuccess |
  LoadFail;

