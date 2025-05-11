import { User } from "../types/api";

class AuthService {
    private readonly TOKEN_KEY = "auth_token";
    private readonly USER_KEY = "user";

    setToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setUser(user: User) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    getUser(): User | null {
        const userStr = localStorage.getItem(this.USER_KEY);
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
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
            return Date.now() < expirationTime;
        } catch {
            return false;
        }
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }
}

export const authService = new AuthService();
