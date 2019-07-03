
import { User } from '../user';

import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'TOOGLE_MASK_USER_NAME':
        console.log('state: ' + JSON.stringify(state));
        console.log('maskUserName: ' + action.payload);
        return {
          ...state,
          maskUserName: action.payload
        };
      default:
        return state;
  }
}
