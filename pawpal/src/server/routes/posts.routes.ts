import { Router } from 'express';
import { createPost, getPosts, deletePost, toggleLike, addComment, getShareLink } from '../controllers/posts.controller';
import requireAuth from '../middleware/auth.middleware';

const router = Router();

// Route to create a new post (authenticated)
router.post('/', requireAuth, createPost);

// Route to get all posts
router.get('/', getPosts);

// Route to delete a post by ID
router.delete('/:id', requireAuth, deletePost);

// Like / unlike a post
router.post('/:id/like', requireAuth, toggleLike);

// Add comment to a post
router.post('/:id/comment', requireAuth, addComment);

// Get share metadata / link
router.get('/:id/share', getShareLink);

export default router;