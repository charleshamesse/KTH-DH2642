import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import * as solidHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import * as emptyHeart from '@fortawesome/fontawesome-free-regular/faHeart';


const addBookToFavorites = (book, favBooks, firebase, auth) => {
  favBooks.push(book.id);
  firebase.database().ref(`users/${auth.uid}`).update({
    favorites: favBooks,
  });
};

const removeBookFromFavorites = (book, favBooks, firebase, auth) => {
  const index = favBooks.indexOf(book.id);
  if (index !== -1) favBooks.splice(index, 1);
  firebase.database().ref(`users/${auth.uid}`).update({
    favorites: favBooks,
  });
};


const handleBookFavoriteClick = (isFavorite, book, favBookIds, firebase, auth) => {
  auth.isEmpty && window.location.replace('/login'); // user not logged in, redirect to login

  isFavorite ?
    removeBookFromFavorites(book, favBookIds, firebase, auth)
    : addBookToFavorites(book, favBookIds, firebase, auth);
};

const BookCard = ({
  apiId, book, title, authors, isFavorite, favBookIds, auth, firebase,
}) => (
  <div className="card mb-4 box-shadow">
    <div className="card-header text-right" data-toggle="tooltip" data-placement="top">
        <FontAwesomeIcon cursor="pointer" size="lg" color="tomato" icon={isFavorite ? solidHeart : emptyHeart} onClick={() => handleBookFavoriteClick(isFavorite, book, favBookIds, firebase, auth)} />
    </div>
    <Link style={{ color: 'black' }} to={`/books/${apiId}`}>
      <img className="card-img-top" src={`https://books.google.com/books/content/images/frontcover/${apiId}?fife=w300-h450`} alt="Card image cap" />
      <div className="card-body">
        <h4>{title}</h4>
        <p className="card-text"><small className="text-muted">{authors.join(', ')}</small></p>
      </div>
    </Link>
  </div>
);

export default BookCard;
