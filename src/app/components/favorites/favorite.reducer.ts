import {ActionEx, FavoriteActionTypes} from './favorite.actions';
export const initialState = [];
export function FavoriteReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case FavoriteActionTypes.Add:
      return [...state, action.payload];
    case FavoriteActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}