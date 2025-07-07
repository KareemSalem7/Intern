// objects and such
export interface User {
    user_id: number;
    email: string;
    uid: string;
}

export interface Thing {
    id: number;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
