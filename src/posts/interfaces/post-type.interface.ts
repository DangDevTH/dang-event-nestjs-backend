export interface PostType {
    id: string;
    content: string;
    featuredImageUrl?: string | null;
    status: string;
    createDate: Date | string;
    author: {
        id: string;
        username: string;
    }
}