export interface User {
    id: string;
    email: string;
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
    location?: string;
    website?: string;
    createdAt: Date;
    updatedAt: Date;
}