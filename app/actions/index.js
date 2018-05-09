import axios from 'axios';

// We should create an axios instance for this
const API_KEY = 'AIzaSyBw6VF7mra0jufF209HhB-83lJBE4_uibk';
const ROOT_URL = 'https://www.googleapis.com/books/v1/';
const ROOT_URL_SEARCH = `${ROOT_URL}volumes?key=${API_KEY}`;
const ROOT_URL_GET = `${ROOT_URL}volumes/`;
const RESULTS_PER_PAGE = 8;

// Action names
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_MORE_BOOKS = 'FETCH_MORE_BOOKS';
export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const MOVE_BOOKCARD = 'MOVE_BOOKCARD';
export const FETCH_PROFILE = 'FETCH_PROFILE';

// Since we're using the middleware redux-promise-middleware
// Promise actions dispatch pending actions and then fulfilled/rejected actions.
export const FULFILLED = '_FULFILLED';
export const PENDING = '_PENDING';

// Action creators
// Search
export function fetchBooks(queryString, type) {
  const url = `${ROOT_URL_SEARCH}&q=${queryString}+${type}:${queryString || '*'}&maxResults=${RESULTS_PER_PAGE}`;
  const request = axios.get(url);// .then(response => response.data.items);
  return {
    type: FETCH_BOOKS,
    payload: request,
  };
}

export function fetchProfile(profileId, firebase) {
  const ref = firebase.database().ref(`users/${profileId}`);
  const request = new Promise((resolve, reject) => {
    resolve(ref.once('value', snapshot => snapshot));
  });
  return {
    type: FETCH_PROFILE,
    payload: request,
  };
}

export function fetchMoreBooks(queryString, nextIndex) {
  const url = `${ROOT_URL_SEARCH}&q=${queryString || '*'}&maxResults=${RESULTS_PER_PAGE}&startIndex=${nextIndex}`;
  const request = axios.get(url);

  return {
    type: FETCH_MORE_BOOKS,
    payload: request,
  };
}

// Book Detail
export function fetchComments(bookId, firebase) {
  const ref = firebase.database().ref(`bookComments/${bookId}`);
  const request = new Promise((resolve, reject) => {
    resolve(ref.once('value', snapshot => snapshot));
  });
  return {
    type: FETCH_COMMENTS,
    payload: request,
  };
}

export function fetchBook(bookId) {
  const url = `${ROOT_URL_GET}${bookId}`;// Seems like API KEY is not needed here? &key=${API_KEY}`;
  const request = axios.get(url);// .then(response => response.data.items);

  return {
    type: FETCH_BOOK,
    payload: request,
  };
}

// Bookshelf
export function fetchFavorites(favorites) {
  const promises = Object.keys(favorites).map((favoriteKey) => {
    const favorite = favorites[favoriteKey];
    const url = `${ROOT_URL_GET}${favorite}?key=${API_KEY}`;// Seems like API KEY is not needed here? &key=${API_KEY}`;
    const request = axios.get(url);// .then(response => response.data.items);
    return request;
  });

  const promise = Promise.all(promises).then((data) => {
    const order = Object.keys(favorites).sort().map(key => favorites[key]);
    return {
      data,
      order,
    };
  });

  return {
    type: FETCH_FAVORITES,
    payload: promise,
  };
}
/**
 * Test
export function fetchFavorites(favorites) {
  const favoritesQueryString = favorites.join('|');
  const url = `${ROOT_URL_SEARCH}&q=${favoritesQueryString}`;
  const request = axios.get(url);// .then(response => response.data.items);

  return {
    type: FETCH_FAVORITES,
    payload: request,
  };
}
*/
export const setBookCardPosition = (dragIndex, hoverIndex) => ({
  type: MOVE_BOOKCARD,
  payload: { dragIndex, hoverIndex },
});

