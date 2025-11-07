import { Schema, model } from 'mongoose';

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Like = model('Like', likeSchema);

export default Like;