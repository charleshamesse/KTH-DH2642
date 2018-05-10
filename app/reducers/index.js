import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import BookDetailReducer from './BookDetailReducer';
import SearchReducer from './SearchReducer';
import FavoriteReducer from './FavoriteReducer';
import ProfileDetailReducer from './ProfileDetailReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  search: SearchReducer,
  bookDetail: BookDetailReducer,
  favorite: FavoriteReducer,
  profileDetail: ProfileDetailReducer,
  firebase: firebaseReducer, // Handles all firebase API calls
});

export default rootReducer;
