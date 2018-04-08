import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'

import BooksReducer from "./reducer_books";

const rootReducer = combineReducers({
  bookHandler: BooksReducer,
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

export default rootReducer;