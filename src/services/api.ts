const API_BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

let isRedirecting = false;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (response.status === 401) {
        if (!isRedirecting) {
            isRedirecting = true;
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            window.location.href = "/login";
        }
        return Promise.reject(new Error("Unauthorized"));
    }
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
            errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
};

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },

    post: async <T>(
        endpoint: string,
        data: { [key: string]: string | number | boolean | undefined }
    ): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    patch: async <T>(
        endpoint: string,
        data: { [key: string]: string | number | boolean | undefined }
    ): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },
};
