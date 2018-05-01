import _ from 'lodash';
import { FETCH_BOOKS, FULFILLED, PENDING } from '../actions';

const initialState = {
  searchString: '',
  searchCategory: 'bookTitle',
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS + PENDING:
      return { ...state, loading: true };

    case FETCH_BOOKS + FULFILLED: {
      return {
        ...state,
        loading: false,
        searchString: state.searchString,
        searchCategory: state.searchCategory,
      };
    }
    default: {
      return state;
    }
  }
}
