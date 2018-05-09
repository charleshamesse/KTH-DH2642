import React from 'react';
import { Link } from 'react-router-dom';

const CommentCard = ({ commentText, username, userId }) => (
  <div className="card mb-3">
    <Link style={{ color: 'black' }} to={`/profiles/${userId}`}>
      <div className="card-header">
        <strong>{username}</strong>
      </div>
    </Link>
    <div className="card-body">
      <p className="card-text">{commentText}</p>
    </div>
  </div>
);

export default CommentCard;
