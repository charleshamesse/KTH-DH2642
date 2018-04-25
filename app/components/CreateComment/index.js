import React from 'react';
import { Link } from 'react-router-dom';

const uploadComment = (bookId, username, timestamp, firebase, comments) => {
  const text = document.getElementById('commentTextArea').value;
  comments.push({ text, username, timestamp });
  firebase.database().ref(`bookComments/${bookId}`).update({
    comments,
  });
  document.getElementById('commentTextArea').value = 'Write a comment...';
};

const CreateComment = ({
  bookId, username, timestamp, firebase, comments,
}) => (
  <div className="row">
    <textarea id="commentTextArea" className="form-control" placeholder="Write a comment..." aria-label="With textarea"></textarea>
    <button type="button" onClick={() => uploadComment(bookId, username, timestamp, firebase, comments)} className="btn btn-outline-secondary">Publish comment</button>
  </div>
);

export default CreateComment;
