import _ from 'lodash';
import { FETCH_BOOKS, FETCH_MORE_BOOKS, FULFILLED, PENDING } from '../actions';

const initialState = {
  books: [],
  nextIndex: 0,
  loading: true,
};

export default function (state = initialState, action) {
  // console.log('Action received:', action);

  switch (action.type) {
    case FETCH_BOOKS + PENDING:
      return { ...state, loading: true };

    case FETCH_BOOKS + FULFILLED: {
      const books = _.mapKeys(action.payload.data.items, 'id');
      const nextIndex = Object.keys(books).length;
      return {
        ...state,
        loading: false,
        totalBooks: action.payload.data.totalItems,
        books,
        nextIndex,
      };
    }

    case FETCH_MORE_BOOKS + PENDING: {
      return { ...state, loading: true };
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
        totalBooks: action.payload.data.totalItems,
        books: allBooks,
        nextIndex,
      };
    }
    default: {
      return state;
    }
  }
}
