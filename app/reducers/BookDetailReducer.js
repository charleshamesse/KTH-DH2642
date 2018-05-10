import _ from 'lodash';
import { FETCH_BOOK, FETCH_COMMENTS, FULFILLED, PENDING, REJECTED } from '../actions';

const initialState = {
  book: {},
  loadingBook: true,
  loadingComments: true,
  errorBook: false,
  errorComments: false,
  comments: [],
};


export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOK + PENDING || FETCH_COMMENTS + PENDING:
      return { ...state, loadingBook: true, loadingComments: true };

    case FETCH_BOOK + FULFILLED: {
      return {
        ...state,
        loadingBook: false,
        book: action.payload.data,
      };
    }
    case FETCH_COMMENTS + FULFILLED: {
      const temp = action.payload.val();
      const comments = temp ? temp.comments : [];
      return {
        ...state,
        loadingComments: false,
        comments,
      };
    }

    case FETCH_BOOK + REJECTED:
      return { ...state, loadingBook: false, errorBook: true };

    case FETCH_COMMENTS + REJECTED:
      return { ...state, loadingComments: false, errorComments: true };

    default: {
      return state;
    }
  }
}
