import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import BooksReducer from './reducer_books';
import BookShelfBarReducer from './reducer_bookshelfbar';
import BookDetailReducer from './reducer_book_detail';

const rootReducer = combineReducers({
  bookHandler: BooksReducer,
  bookShelfBar: BookShelfBarReducer,
  bookDetail: BookDetailReducer,
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
});

export default rootReducer;
