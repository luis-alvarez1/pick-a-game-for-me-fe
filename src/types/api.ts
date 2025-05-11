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
    [key: string]: string | number | boolean;
}

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
    [key: string]: string | number | boolean;
}

export interface AuthResponse {
    token: string;
    name: string;
}

export interface CreateGameRequest {
    name: string;
    platformId: number;
    completed: boolean;
    [key: string]: string | number | boolean;
}

export interface UpdateGameRequest {
    name?: string;
    platformId?: number;
    completed?: boolean;
    [key: string]: string | number | boolean | undefined;
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

export interface PaginatedGamesResponse {
    data: Game[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
