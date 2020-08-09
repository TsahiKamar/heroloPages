import {Action} from '@ngrx/store';

export enum FavoriteActionTypes {
  Add = '[Favorite Component] Add',
  Remove = '[Favorite Component] Remove'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class FavoriteAdd implements ActionEx {
  readonly type = FavoriteActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class FavoriteRemove implements ActionEx {
  readonly type = FavoriteActionTypes.Remove;
  constructor(public payload: any) {
  }
}