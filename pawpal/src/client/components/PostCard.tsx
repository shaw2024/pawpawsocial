import React, { useState } from 'react';
import { Post } from '../types';
import api from '../api';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const [likeCount, setLikeCount] = useState<number>((post as any).likeCount || 0);
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>((post as any).comments || []);
  const [commentText, setCommentText] = useState('');
  const id = (post as any)._id || (post as any).id;

  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${id}/like`);
      setLikeCount(res.data.likeCount);
      setLiked(prev => !prev);
      onLike && onLike(id);
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await api.post(`/posts/${id}/comment`, { content: commentText });
      setComments(prev => [...prev, res.data]);
      setCommentText('');
      onComment && onComment(id, commentText);
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  const handleShare = async () => {
    try {
      const res = await api.get(`/posts/${id}/share`);
      const postId = res.data.postId || id;
      const url = `${window.location.origin}/posts/${postId}`;

      if (navigator.share) {
        await navigator.share({ title: 'Check out this PawPal post', url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Post link copied to clipboard');
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  return (
    <div className="post-card p-4 bg-white rounded shadow">
      <div className="post-header flex items-center gap-3 mb-3">
        <img src={(post as any).userId?.profilePicture || '/images/default-profile.png'} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-medium">{(post as any).userId?.username || 'Unknown'}</div>
          <div className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>
      <p className="mb-3">{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="post" className="w-full rounded mb-3" />}
      <div className="post-actions flex items-center gap-4 mb-3">
        <button onClick={handleLike} className="mr-3">{liked ? 'Unlike' : 'Like'} ❤️ ({likeCount})</button>
        <button onClick={handleShare} className="text-sm text-slate-600">Share ↗</button>
      </div>
      <form onSubmit={handleCommentSubmit} className="mb-3">
        <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" name="comment" placeholder="Add a comment..." className="w-full p-2 border rounded" />
        <div className="mt-2">
          <button type="submit" className="bg-sky-500 text-white px-3 py-1 rounded">Comment</button>
        </div>
      </form>
      <div className="comments">
        {post.comments && post.comments.map((comment: any, index: number) => (
          <div key={index} className="comment mt-2 border-t pt-2">
            <div className="text-sm font-medium">{comment.userId?.username || 'User'}</div>
            <div className="text-sm">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;