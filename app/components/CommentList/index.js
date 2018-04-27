import React from 'react';
import { Link } from 'react-router-dom';
import CommentCard from '../../components/CommentCard';

const renderComments = (comments) => {
  if (Object.keys(comments).length !== 0) {
    const arr = Object.keys(comments).map(k => comments[k]);
    const listItems = arr.map((comment, i) => <CommentCard key={i}
                                                          username={comment.username}
                                                          commentText={comment.text} />);
    return (listItems);
  }
  return (<h4>No comments for this book yet.</h4>);
};

const CommentList = ({ comments }) => (
  renderComments(comments)
);

export default CommentList;
