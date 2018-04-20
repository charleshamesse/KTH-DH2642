import { MOVE_BOOKCARD } from '../actions';

const initialState = {
  books: [
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
    {
      id: 5,
      text:
        'Spam',
    },
    {
      id: 6,
      text: '???',
    },
    {
      id: 7,
      text: 'PROFIT',
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
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
