import { Action, Reducer, AnyAction } from 'redux';
import { IAppThunkAction } from './_configure';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IArtworkState {
  records: Artwork[];
  dashboardList: string[];
  loading: boolean;
  searchResults: string[];
}
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface IFetchArtworkAction { type: 'FETCH_ARTWORK' }
interface IFetchArtworkResultAction { type: 'FETCH_ARTWORK_RESULT', data: Artwork[], updateDashboard: boolean }
interface ISearchArtworkResultAction { type: 'SEARCH_ARTWORK_RESULT', data: string[] }
interface ISearchFocusAction { type: 'SEARCH_FOCUS' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = IFetchArtworkAction | IFetchArtworkResultAction | ISearchArtworkResultAction | ISearchFocusAction;

const baseUrl = 'https://search.artsmia.org/';
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
  fetchArtworkById: (id: string): IAppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "FETCH_ARTWORK" });
    axios.get(`${baseUrl}id/${id}`)
    .then(result => {
      return result.data as Artwork;
    })
    .then(data => {
      const artArray: Artwork[] = [];
      artArray.push(data as Artwork);
      dispatch({type:"FETCH_ARTWORK_RESULT", data: artArray, updateDashboard: false })
    })
    .catch(err => {
      console.log("ERROR: ", err);
    })
  },
  fetchRandom: (count: number): IAppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "FETCH_ARTWORK" });  
    axios.get(`${baseUrl}random/art?size=${count}&q=restricted:0+image:valid`)
    .then(result => {
      const resultList = result.data as IHit[];
      return resultList.map(r => r._source as Artwork) as Artwork[];
    })
    .then((data: Artwork[]) => {
      dispatch({type:"FETCH_ARTWORK_RESULT", data: data, updateDashboard: true });
    })
    .catch(err => {
      console.log("ERROR: ", err);
    })
  },
  search: (search: string): IAppThunkAction<KnownAction> => (dispatch) => {
    axios.get(`${baseUrl}"${search}"`)
    .then(result => {
      const searchResult = result.data as ISearchResult;
      const hits: IHit[] = searchResult.hits.hits;
      return hits.map(r => r._source as Artwork) as Artwork[];
    })
    .then((data: Artwork[]) => {
      dispatch({type:"FETCH_ARTWORK_RESULT", data: data, updateDashboard: false });
      dispatch({type:"SEARCH_ARTWORK_RESULT", data: data.map(a => a.id)});
    })
    .catch(err => {
      console.log("ERROR: ", err);
    })
  },
  clearSearch: (): IAppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: "SEARCH_FOCUS" });
  }
}
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const unloadedState: IArtworkState = { records: [], loading: false, dashboardList: [], searchResults: [] };
export const reducer: Reducer = (state: IArtworkState, incomingAction: KnownAction): IArtworkState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'FETCH_ARTWORK':
      return Object.assign({},{
        ...state,
        loading: true
      });
    case 'FETCH_ARTWORK_RESULT':
      const addArtworkArray:Artwork[] = state.records.concat(action.data);
      return Object.assign({}, {
        ...state,
        loading:false,
        records: addArtworkArray,
        dashboardList: action.updateDashboard ? action.data.map(a => a.id) : state!.dashboardList
      });
    case 'SEARCH_ARTWORK_RESULT':
      const addSearchArray:string[] = state.searchResults.concat(action.data);
      return Object.assign({
        ...state,
        searchResults: action.data
      });
    case 'SEARCH_FOCUS':
      return Object.assign({
        ...state,
        searchResults: []
      })
    default:
      // The following line guarantees that every action in the KnownAction union has been covered by a case above
      const exhaustiveCheck: never = action;
  }
  return state || unloadedState;
};