import { api } from "./api";
import { LoginRequest, SignupRequest, AuthResponse, User } from "../types/api";

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(
            "/auth/login",
            credentials
        );
        if (response.token) {
            localStorage.setItem("token", response.token);
            const user = await authService.getUser();
            if (user) {
                localStorage.setItem("userName", user.name);
            }
        }
        return response;
    },

    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/users/signup", data);
        if (response.token) {
            localStorage.setItem("token", response.token);
            const user = await authService.getUser();
            if (user) {
                localStorage.setItem("userName", user.name);
            }
        }
        return response;
    },

    getUser: async (): Promise<User | null> => {
        try {
            const response = await api.get<User>("/users/me");
            return response;
        } catch (error) {
            console.error("Failed to get user:", error);
            return null;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "/login";
    },

    getToken: (): string | null => {
        return localStorage.getItem("token");
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        return true;
    },

    getUserName: (): string | null => {
        return localStorage.getItem("userName");
    },
};
