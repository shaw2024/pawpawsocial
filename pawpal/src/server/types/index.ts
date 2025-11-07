export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Post {
    id: string;
    userId: string;
    content: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Like {
    id: string;
    postId: string;
    userId: string;
    createdAt: Date;
}