import _ from 'lodash';
import { FETCH_BOOK, FULFILLED, PENDING } from '../actions';

const initialState = {
  book: {},
  loading: true,
};


export default function (state = initialState, action) {
  console.log('Action received:', action);

  switch (action.type) {
    case FETCH_BOOK + PENDING:
      return { ...state, loading: true };

    case FETCH_BOOK + FULFILLED: {
      return {
        ...state,
        loading: false,
        book: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}
