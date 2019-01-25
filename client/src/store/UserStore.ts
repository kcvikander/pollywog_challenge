import { Action, Reducer } from 'redux';
import { IAppThunkAction } from './_configure';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IUserState {
  likes: string[];
}
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface IToggleLikeArtworkAction { type: 'TOGGLE_LIKE', id: string }
interface IFetchLikesResultAction { type: "FETCH_LIKES_RESULT", data: string[] }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = IToggleLikeArtworkAction | IFetchLikesResultAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
  fetchLikes: (): IAppThunkAction<KnownAction> => (dispatch) => { 
    axios.get('/likes')
    .then(result => {
      return result.data as string[];
    })
    .then((data: string[]) => {
      dispatch({type:"FETCH_LIKES_RESULT", data: data });
    })
    .catch(err => {
      console.log("ERROR: ", err);
    })
  },
  toggleLike: (id: string): IAppThunkAction<KnownAction> => (dispatch) => {
    axios.post('/likes', { id: id }, { headers: {'Content-Type': 'application/json' }})
    .then(result => {
      dispatch({ type: "TOGGLE_LIKE", id: id });
    })
    .catch(err => {
      console.log("ERROR: ", err);
    })
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const unloadedState: IUserState = { likes: [] };
export const reducer: Reducer = (state: IUserState, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'FETCH_LIKES_RESULT':
      return Object.assign({},{
        likes: action.data
      });
    case 'TOGGLE_LIKE':
      const likeList = state.likes;
      const likeMatch = likeList.indexOf(action.id);
      if (likeMatch === -1){ 
        likeList.push(action.id);
      } else {
        likeList.splice(likeMatch, 1);
      }
      return Object.assign({},{
        ...state,
        likes: likeList 
      });
    default:
      // The following line guarantees that every action in the KnownAction union has been covered by a case above
      const exhaustiveCheck: never = action;
  }
  return state || unloadedState;
};