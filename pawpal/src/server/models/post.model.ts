import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes to accelerate feed queries
postSchema.index({ createdAt: -1 });
postSchema.index({ userId: 1 });

const Post = model('Post', postSchema);

export default Post;