import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToogleProductCode:
        return {
          ...state,
          showProductCode: action.payload
        };

    case ProductActionTypes.SetCurrentProduct:
    return {
      ...state,
      currentProduct : {...action.payload}
    };

    case ProductActionTypes.ClearCurrentProduct:
    return {
      ...state,
      currentProduct: null
    };

    case ProductActionTypes.InitializeCurrentProduct:
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    default:
        return state;
  }
}
