const API_BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8001";

console.log("API_BASE_URL:", API_BASE_URL); // Debugging line

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
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
            errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
};

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        console.log("Making GET request to:", `${API_BASE_URL}${endpoint}`); // Debugging line
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },

    post: async <T>(endpoint: string, data: unknown): Promise<T> => {
        console.log("Making POST request to:", `${API_BASE_URL}${endpoint}`); // Debugging line
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    put: async <T>(endpoint: string, data: unknown): Promise<T> => {
        console.log("Making PUT request to:", `${API_BASE_URL}${endpoint}`); // Debugging line
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        console.log("Making DELETE request to:", `${API_BASE_URL}${endpoint}`); // Debugging line
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },
};
