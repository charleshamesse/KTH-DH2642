import _ from 'lodash';
import { FETCH_BOOKS, FULFILLED, PENDING } from '../actions';

const initialState = {
  searchString: '',
  loading: true,
};


export default function (state = initialState, action) {
  console.log('Search. Action received:', action);

  switch (action.type) {
    case FETCH_BOOKS + PENDING:
      return { ...state, loading: true };

    case FETCH_BOOKS + FULFILLED: {
      return {
        ...state,
        loading: false,
        searchString: state.searchString,
      };
    }
    default: {
      return state;
    }
  }
}
