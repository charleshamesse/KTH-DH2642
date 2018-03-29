import { combineReducers } from "redux";
import BooksReducer from "./reducer_books";

const rootReducer = combineReducers({
  bookHandler: BooksReducer,
});

export default rootReducer;