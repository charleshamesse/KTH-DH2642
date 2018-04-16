import axios from "axios";

// We should create an axios instance for this
const API_KEY = "AIzaSyBw6VF7mra0jufF209HhB-83lJBE4_uibk";
const ROOT_URL = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}`;

// Action names
export const FETCH_BOOKS = "FETCH_BOOKS";
export const MOVE_BOOKCARD = "MOVE_BOOKCARD";

// Since we're using the middleware redux-promise-middleware
// Promise actions dispatch pending actions and then fulfilled actions.
export const FULFILLED = "_FULFILLED";
export const PENDING = "_PENDING";

// Action creators
export function fetchBooks(queryString) {

    const url = `${ROOT_URL}&q=${queryString}&maxResults=8`;
    const request = axios.get(url)// .then(response => response.data.items);

    return {
        type: FETCH_BOOKS,
        payload: request
    };
    
}

export const setBookCardPosition = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_BOOKCARD,
    payload: {dragIndex, hoverIndex}
  }
}