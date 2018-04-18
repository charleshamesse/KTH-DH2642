import _ from 'lodash';
import { FETCH_BOOKS, FULFILLED, PENDING } from '../actions';

const initialState = {
  books: [],
  fetching: true,
};


export default function (state = initialState, action) {
  // console.log('Action received:', action);
  switch (action.type) {
    /*
      case DELETE_POST:
        return _.omit(state, action.payload);
      case FETCH_POST:
        return { ...state, [action.payload.data.id]: action.payload.data };
        */
    case FETCH_BOOKS + PENDING:
      return { ...state, loading: true };

    case FETCH_BOOKS + FULFILLED:
      return {
        ...state,
        loading: false,
        books: _.mapKeys(action.payload.data.items, 'id'),
      };
    default:
      return state;
  }
}
