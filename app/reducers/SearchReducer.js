import _ from 'lodash';
import { EDIT_SEARCH, FETCH_BOOKS, FETCH_MORE_BOOKS, FULFILLED, PENDING, REJECTED } from '../actions';

const initialState = {
  searchString: '',
  searchCategory: 'bookTitle',
  loading: true,
  books: [],
  nextIndex: 0,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_SEARCH:
      return {
        ...state,
        books: [],
        searchString: action.payload.searchString,
        searchCategory: action.payload.searchCategory,
      };

    case FETCH_BOOKS + PENDING:
      return { ...state, loading: true, error: false };

    case FETCH_BOOKS + FULFILLED: {
      const books = _.mapKeys(action.payload.data.items, 'id');
      const nextIndex = Object.keys(books).length;
      return {
        ...state,
        loading: false,
        totalBooks: action.payload.data.totalItems,
        books,
        nextIndex,
        searchString: state.searchString,
        searchCategory: state.searchCategory,
        error: false,
      };
    }

    case FETCH_BOOKS + REJECTED:
      return { ...state, loading: false, error: true };

    case FETCH_MORE_BOOKS + PENDING: {
      return { ...state, loading: true, error: false };
    }

    case FETCH_MORE_BOOKS + FULFILLED: {
      // New books
      const newBooks = _.mapKeys(action.payload.data.items, 'id');

      // Concat all books
      const allBooks = {
        ...state.books,
        ...newBooks,
      };

      // Next search index
      const nextIndex = Object.keys(allBooks).length;

      return {
        ...state,
        loading: false,
        books: allBooks,
        nextIndex,
        error: false,
      };
    }

    case FETCH_MORE_BOOKS + REJECTED: {
      return { ...state, loading: false, error: true };
    }

    default: {
      return state;
    }
  }
}
