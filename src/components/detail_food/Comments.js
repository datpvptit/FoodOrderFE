import React from "react";

const Comment = ({ author, content }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title comment-author">{author}</h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
