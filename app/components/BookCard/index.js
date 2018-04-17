import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as solidHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import * as emptyHeart from '@fortawesome/fontawesome-free-regular/faHeart'


const BookCard = ({ apiId, book, title, thumbnail, isFavorite, addToFavoritesFunc }) => (
  <div className="card mb-4 box-shadow">
    <div className="card-header">
      {isFavorite ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={emptyHeart}/> }
    </div>
    <img className="card-img-top" src={"https://books.google.com/books/content/images/frontcover/" + apiId + "?fife=w300-h450"} alt="Card image cap" />
    <div className="card-body">
      <h4>{title}</h4>
      <p className="card-text">
        Text
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group">
          <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
          <button type="button" 
                  className={isFavorite ? "btn btn-sm btn-outline-secondary": "btn btn-danger btn-sm btn-outline-secondary"} 
                  onClick={addToFavoritesFunc}>
                  {isFavorite ? "Remove from favorites": "Add to favorites"}
          </button>
        </div>
        <small className="text-muted">9 mins</small>
      </div>
    </div>
  </div>
)

export default BookCard;