import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import { UserActions, UserActionTypes } from './user.actions';

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

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.ToogleMaskUserName:
        return {
          ...state,
          maskUserName: action.payload
        };
      default:
        return state;
  }
}
