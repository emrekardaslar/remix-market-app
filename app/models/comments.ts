export interface Comment {
    id: string;
    productId: string;
    content: string;
    author?: string;
    avatar?: string;
    datetime?: string;
    user: {
        username: string;
    }
    createdAt: Date;
}

export interface CommentResponse {
    value: string;
    id: string;
    user: {
        id: string;
    }
}