import _ from 'lodash';
import { FETCH_BOOK, FULFILLED, PENDING, FETCH_COMMENTS } from '../actions';

const initialState = {
  book: {},
  loadingBook: true,
  loadingComments: true,
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
    default: {
      return state;
    }
  }
}
