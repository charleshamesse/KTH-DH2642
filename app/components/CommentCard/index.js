import React from 'react';
import { Link } from 'react-router-dom';

const CommentCard = ({ commentText, username }) => (
  <div className="card row">
    <div className="card-header">
      <strong>{username}</strong>
    </div>
    <div className="card-body">
      <p className="card-text">{commentText}</p>
    </div>
  </div>
);

// const removeBookFromFavorites = (book, favBooks, firebase, auth) => {
//   const index = favBooks.indexOf(book.id);
//   if (index !== -1) favBooks.splice(index, 1);
//   firebase.database().ref(`users/${auth.uid}`).update({
//     favorites: favBooks,
//   });
// };

export default CommentCard;
