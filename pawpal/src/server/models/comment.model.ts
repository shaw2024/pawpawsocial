import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
}

const commentSchema = new Schema<IComment>({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;