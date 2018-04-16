import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'

import BooksReducer from "./reducer_books";
import BookShelfBarReducer from "./reducer_bookshelfbar";

const rootReducer = combineReducers({
  bookHandler: BooksReducer,
  BookShelfBar: BookShelfBarReducer,
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

export default rootReducer;