import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import BookDetailReducer from './BookDetailReducer';
import SearchReducer from './SearchReducer';
import FavoriteReducer from './FavoriteReducer';
import ProfileDetailReducer from './ProfileDetailReducer';

const rootReducer = combineReducers({
  search: SearchReducer,
  bookDetail: BookDetailReducer,
  favorite: FavoriteReducer,
  profileDetail: ProfileDetailReducer,
  firebase: firebaseReducer,
  // firestore: firestoreReducer // needed if using firestore
});

export default rootReducer;
