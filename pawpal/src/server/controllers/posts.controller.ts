import { Request, Response } from 'express';
import Post from '../models/post.model';
import Like from '../models/like.model';
import Comment from '../models/comment.model';
import User from '../models/user.model';

// Simple in-memory cache for recent pages (key: page:limit)
const cache = new Map<string, { ts: number; data: any }>();
const CACHE_TTL = 5 * 1000; // 5 seconds

// Create a new post (authenticated)
export const createPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.userId || req.body.userId;
        const { content, imageUrl } = req.body;
        if (!userId) return res.status(401).json({ message: 'Authentication required' });

        const newPost = new Post({ userId, content, imageUrl });
        await newPost.save();
        const populated = await newPost.populate('userId', 'username profilePicture dogBreed');

        // Clear cache for first page since newest post changed
        cache.delete(`1:10`);

        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Fetch paginated posts (newest first) with likes count and comments
export const getPosts = async (req: Request, res: Response) => {
    try {
        const page = Math.max(parseInt((req.query.page as string) || '1', 10), 1);
        const limit = Math.max(parseInt((req.query.limit as string) || '10', 10), 1);
        const key = `${page}:${limit}`;

        // Return cached result when fresh
        const cached = cache.get(key);
        if (cached && Date.now() - cached.ts < CACHE_TTL) {
            return res.status(200).json(cached.data);
        }

        const skip = (page - 1) * limit;
        const totalItems = await Post.countDocuments();
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'username profilePicture dogBreed');

        // Map to include like counts and comments for each post
        const enhanced = await Promise.all(posts.map(async (p: any) => {
            const likeCount = await Like.countDocuments({ postId: p._id });
            const comments = await Comment.find({ postId: p._id }).populate('userId', 'username profilePicture');
            return { ...p.toObject(), likeCount, comments };
        }));

        const totalPages = Math.ceil(totalItems / limit) || 1;
        const payload = { posts: enhanced, page, limit, totalPages, totalItems };

        // Cache the first page to reduce DB load briefly
        cache.set(key, { ts: Date.now(), data: payload });

        res.status(200).json(payload);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};

// Like / unlike a post
export const toggleLike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        // @ts-ignore
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'Authentication required' });

        const existing = await Like.findOne({ postId, userId });
        if (existing) {
            await existing.remove();
        } else {
            const newLike = new Like({ postId, userId });
            await newLike.save();
        }

        const likeCount = await Like.countDocuments({ postId });
        res.status(200).json({ likeCount });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling like', error });
    }
};

// Add a comment to a post
export const addComment = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        // @ts-ignore
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'Authentication required' });

        const comment = new Comment({ postId, userId, content });
        await comment.save();

        // attach to post comments array
        const post = await Post.findById(postId);
        if (post) {
            post.comments.push(comment._id);
            await post.save();
        }

        const populated = await Comment.findById(comment._id).populate('userId', 'username profilePicture');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

// Share endpoint — returns permalink data (client can call Web Share API)
export const getShareLink = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('userId', 'username');
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // For simplicity, return post id — client constructs full URL
        res.status(200).json({ postId: post._id });
    } catch (error) {
        res.status(500).json({ message: 'Error preparing share', error });
    }
};