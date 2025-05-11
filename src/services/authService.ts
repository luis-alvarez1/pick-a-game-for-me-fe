import api from "./api";
import { LoginRequest, SignupRequest, AuthResponse, User } from "../types/api";
import { storageService } from "./storage.service";

class AuthService {
    private readonly TOKEN_KEY = "auth_token";
    private readonly USER_KEY = "user";

    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/login", data);
        storageService.setItem(this.TOKEN_KEY, response.data.token);
        storageService.setItem(this.USER_KEY, JSON.stringify(response.data));
        return response.data;
    }

    async signup(data: SignupRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/users/signup", data);
        storageService.setItem(this.TOKEN_KEY, response.data.token);
        storageService.setItem(this.USER_KEY, JSON.stringify(response.data));
        return response.data;
    }

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>("/users/me");
        return response.data;
    }

    getToken(): string | null {
        return storageService.getItem(this.TOKEN_KEY);
    }

    getUser(): User | null {
        const userStr = storageService.getItem(this.USER_KEY);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expirationTime = payload.exp * 1000;
            return Date.now() < expirationTime;
        } catch {
            return false;
        }
    }

    logout(): void {
        storageService.removeItem(this.TOKEN_KEY);
        storageService.removeItem(this.USER_KEY);
    }

    getUserName(): string | null {
        const user = this.getUser();
        return user?.name || null;
    }
}

export const authService = new AuthService();
