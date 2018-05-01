import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import BooksReducer from './BookReducer';
import BookShelfBarReducer from './BookshelfReducer';
import BookDetailReducer from './BookDetailReducer';
import SearchReducer from './SearchReducer';

const rootReducer = combineReducers({
  bookHandler: BooksReducer,
  bookShelfBar: BookShelfBarReducer,
  bookDetail: BookDetailReducer,
  firebase: firebaseReducer,
  searchData: SearchReducer,
  // firestore: firestoreReducer // needed if using firestore
});

export default rootReducer;
