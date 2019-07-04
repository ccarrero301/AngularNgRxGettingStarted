import { Action } from '@ngrx/store';

export enum UserActionTypes {
  ToogleMaskUserName = '[User] Toogle Mask User Name'
}

export class ToogleMaskUserName implements Action {
  readonly type = UserActionTypes.ToogleMaskUserName;

  constructor(public payload: boolean) { }
}

export type UserActions = ToogleMaskUserName;
