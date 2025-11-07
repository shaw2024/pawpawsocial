import React from 'react';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p><strong>{comment.author}:</strong> {comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;