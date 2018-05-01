import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import BooksReducer from './BookReducer';
import BookShelfBarReducer from './BookshelfReducer';
import BookDetailReducer from './BookDetailReducer';
import SearchReducer from './SearchReducer';
import FavoriteReducer from './FavoriteReducer';

const rootReducer = combineReducers({
  search: SearchReducer,
  bookDetail: BookDetailReducer,
  // bookshelf: BookShelfBarReducer,
  favorite: FavoriteReducer,
  firebase: firebaseReducer,
  // firestore: firestoreReducer // needed if using firestore
});

export default rootReducer;
