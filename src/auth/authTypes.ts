// User and Session types for authentication
export interface User {
    id: string;
    username: string;
    email: string;
    phone?: string;
    createdAt: string;
    password: string; // Hashed in real app, plain for mock
}

export interface Session {
    user: Omit<User, 'password'>;
    token: string;
    expiresAt: string;
}

export interface LoginCredentials {
    usernameOrEmail: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
}

export interface AuthError {
    field?: string;
    message: string;
}
