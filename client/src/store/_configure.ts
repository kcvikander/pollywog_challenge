import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as UserStore from './UserStore';
import * as ArtworkStore from './ArtworkStore';
export interface IApplicationState {
  User: UserStore.IUserState,
  Artwork: ArtworkStore.IArtworkState
}

export const actionCreators = Object.assign({}, 
  UserStore.actionCreators, ArtworkStore.actionCreators
);
// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
export const configureStore = () => {
  const offlineState = localStorage.getItem("pollywog:state");
  const loadedState = offlineState ? JSON.parse(offlineState) : { User: UserStore.unloadedState, Artwork: ArtworkStore.unloadedState };
  const _store = createStore(
    combineReducers<IApplicationState> (
      Object.assign({}, 
        { User: UserStore.reducer, Artwork: ArtworkStore.reducer },
        { routing: routerReducer }
      ) as ReducersMapObject 
    ), 
    loadedState,
    compose(applyMiddleware(thunkMiddleware)));
  // Save state to local storage on every change
  _store.subscribe(() => {
    const state = _store.getState();
    localStorage.setItem("pollywog:state", JSON.stringify(state))
  });
  return _store;
}