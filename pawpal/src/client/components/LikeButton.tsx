import React, { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
  onLike: (newLikes: number) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, onLike }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    const newLikes = liked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setLiked(!liked);
    onLike(newLikes);
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likes})
    </button>
  );
};

export default LikeButton;