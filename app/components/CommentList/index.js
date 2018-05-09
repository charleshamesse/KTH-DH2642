import React from 'react';
import CommentCard from '../../components/CommentCard';

const renderComments = (comments) => {
  if (Object.keys(comments).length !== 0) {
    const arr = Object.keys(comments).map(k => comments[k]);
    const listItems = arr.map((comment, i) => <CommentCard key={i}
                                                          username={comment.username}
                                                          userId={comment.userId}
                                                          commentText={comment.text} />);
    return (listItems);
  }
  return (<p>No comments for this book yet.</p>);
};

const CommentList = ({ comments }) => (
  renderComments(comments)
);

export default CommentList;
