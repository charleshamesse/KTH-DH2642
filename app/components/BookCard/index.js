import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as solidHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import * as emptyHeart from '@fortawesome/fontawesome-free-regular/faHeart'
import { Link } from 'react-router-dom'


const BookCard = ({ apiId, book, title, thumbnail, isFavorite, addToFavoritesFunc, authors, onClickFunc }) => (
  <div className="card mb-4 box-shadow">
    <div className="card-header text-right">
        <FontAwesomeIcon cursor="pointer" size="lg" color="tomato" icon={isFavorite ? solidHeart : emptyHeart} onClick={addToFavoritesFunc} /> 
    </div>
    <Link to={`/books/${apiId}`}>
      <img className="card-img-top" src={"https://books.google.com/books/content/images/frontcover/" + apiId + "?fife=w300-h450"} alt="Card image cap" />
      <div className="card-body">
        <h4>{title}</h4>
        <p className="card-text"><small className="text-muted">{authors.join(', ')}</small></p>
      </div>
    </Link>
  </div>
)

export default BookCard;