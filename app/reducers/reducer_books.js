import _ from 'lodash';
import { FETCH_BOOKS, FETCH_MORE_BOOKS, FULFILLED, PENDING } from '../actions';

const initialState = {
  books: [],
  bookPage: 1,
  loading: true,
};


export default function (state = initialState, action) {
  console.log('Action received:', action);

  switch (action.type) {
    case FETCH_BOOKS + PENDING:
      return { ...state, loading: true };

    case FETCH_BOOKS + FULFILLED: {
      console.log(action.payload.data.items);
      return {
        ...state,
        loading: false,
        books: _.mapKeys(action.payload.data.items, 'id'),
        bookPage: 1,
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

      const nextPage = state.bookPage + 1;

      console.log('allBooks length');
      console.log(Object.keys(allBooks).length);
      return {
        ...state,
        loading: false,
        totalBooks: action.payload.data.totalItems,
        books: allBooks,
        bookPage: nextPage,
      };
    }
    default: {
      return state;
    }
  }
}
