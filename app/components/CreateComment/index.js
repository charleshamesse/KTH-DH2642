import React from 'react';
import { Link } from 'react-router-dom';


const CreateComment = ({
  bookId, username, timestamp, uploadFunc,
}) => (
  <div className="row">
    <textarea id="commentTextArea" className="form-control" placeholder="Write a comment..." aria-label="With textarea"></textarea>
    <button type="button" onClick={() => uploadFunc(bookId, username, timestamp)} className="btn btn-outline-secondary">Publish comment</button>
  </div>
);

export default CreateComment;
