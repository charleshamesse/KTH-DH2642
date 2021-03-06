import React from 'react';
import { Link } from 'react-router-dom';


const CreateComment = ({
  bookId, username, userId, timestamp, uploadFunc,
}) => (
  <div>
    <textarea id="commentTextArea" className="form-control mb-3" placeholder="Write a comment..." aria-label="With textarea"></textarea>
    <button type="button" onClick={() => uploadFunc(bookId, username, userId, timestamp)} className="btn btn-outline-secondary">Publish comment</button>
  </div>
);

export default CreateComment;
