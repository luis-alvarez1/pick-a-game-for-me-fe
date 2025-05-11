import axios from "axios";
import { authService } from "./auth.service";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8001",
});

api.interceptors.request.use((config) => {
    const token = authService.getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.logout();
            if (!window.location.pathname.includes("/login")) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
