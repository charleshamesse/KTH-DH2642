import _ from 'lodash';
import { FETCH_FAVORITES, MOVE_BOOKCARD, FULFILLED, PENDING } from '../actions';

const initialState = {
  books: [],
  loading: false,
};


export default function (state = initialState, action) {
  console.log('Favorite. Action received:', action);

  switch (action.type) {
    case FETCH_FAVORITES + PENDING:
      console.log('fetch fav p');
      return { ...state, loading: true };

    case FETCH_FAVORITES + FULFILLED: {
      console.log('fetch fav ff');
      return {
        ...state,
        loading: false,
        books: action.payload, // .data,
      };
    }

    case MOVE_BOOKCARD: {
      // Get all needed indices and cards for replacement
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.books[dragIndex];
      const hoverCard = state.books[hoverIndex];

      // Edit the array - the redux way
      const sb = state.books.slice(0, state.books.length);
      sb.splice(hoverIndex, 1, dragCard);
      sb.splice(dragIndex, 1, hoverCard);

      // Return state
      return {
        ...state,
        books: sb,
      };
    }

    default: {
      return state;
    }
  }
}
