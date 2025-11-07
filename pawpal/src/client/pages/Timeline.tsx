import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import PostComposer from '../components/PostComposer';
import api from '../api';

const Timeline = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPage = async (p: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/posts', { params: { page: p, limit } });
            const data = res.data;
            if (p === 1) {
                setPosts(data.posts);
            } else {
                setPosts(prev => [...prev, ...data.posts]);
            }

            setHasMore(p < data.totalPages);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // load first page
        fetchPage(1);
    }, []);

    const loadMore = () => {
        const next = page + 1;
        setPage(next);
        fetchPage(next);
    };

    const handlePostCreated = (post: any) => {
        // Prepend to timeline and keep pagination intact
        setPosts(prev => [post, ...prev]);
    };

    return (
        <div className="timeline max-w-3xl mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shared Timeline</h1>
            <PostComposer onPostCreated={handlePostCreated} />

            {posts.length === 0 && !loading && <div className="text-slate-500">No posts yet. Be the first!</div>}

            <div className="post-list space-y-4">
                {posts.map(post => (
                    <PostCard key={post._id || post.id} post={post} />
                ))}
            </div>

            {error && <div className="text-red-600 mt-4">{error}</div>}

            <div className="mt-6 text-center">
                {loading && <div>Loading...</div>}
                {!loading && hasMore && (
                    <button onClick={loadMore} className="px-4 py-2 bg-amber-500 text-white rounded">Load more</button>
                )}
                {!hasMore && <div className="text-slate-500 mt-2">No more posts</div>}
            </div>
        </div>
    );
}

export default Timeline;