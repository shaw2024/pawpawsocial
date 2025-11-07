import React, { useState } from 'react';
import api from '../api';
import { config } from '../../../src/shared/config/default';

interface Props {
    onPostCreated?: (post: any) => void;
}

const PostComposer: React.FC<Props> = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!content.trim() && !image) {
            setError('Please add text or an image');
            return;
        }

        // client-side validation for image
                if (image) {
                    if (config.allowedImageTypes.indexOf(image.type) === -1) {
                        setError('Unsupported image type');
                        return;
                    }
            if (image.size > config.maxImageSize) {
                setError('Image is too large');
                return;
            }
        }

        setLoading(true);

        try {
            let imageUrl: string | undefined;

            if (image) {
                const form = new FormData();
                form.append('file', image);

                const uploadRes = await api.post('/uploads', form, { headers: { 'Content-Type': 'multipart/form-data' } });
                imageUrl = uploadRes.data.url;
            }

            const createRes = await api.post('/posts', { content, imageUrl });
            const post = createRes.data;

            // notify parent to refresh timeline
            onPostCreated && onPostCreated(post);

            // reset
            setContent('');
            setImage(null);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Post failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-composer p-4 bg-white rounded shadow mb-6">
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="What's on your mind?"
                className="w-full p-2 border rounded mb-2"
            />
            <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit" disabled={loading} className="bg-amber-500 text-white px-4 py-2 rounded">
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
    );
};

export default PostComposer;