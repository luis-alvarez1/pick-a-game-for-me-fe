export interface User {
    id: number;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
}

export interface Platform {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    name: string;
    completed: boolean;
    isActive: boolean;
    platform: Platform;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    name: string;
}

export interface CreateGameRequest {
    name: string;
    platformId: number;
    completed: boolean;
}

export interface UpdateGameRequest {
    name?: string;
    platformId?: number;
    completed?: boolean;
}

export interface CreatePlatformRequest {
    name: string;
}

export interface UpdatePlatformRequest {
    name: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
}
