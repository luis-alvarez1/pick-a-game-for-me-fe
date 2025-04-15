import { api } from "./api";
import { Game, CreateGameRequest, UpdateGameRequest } from "../types/api";

export const gameService = {
    getAll: async (search?: string): Promise<Game[]> => {
        const endpoint = search
            ? `/games?search=${encodeURIComponent(search)}`
            : "/games";
        return api.get<Game[]>(endpoint);
    },

    getById: async (id: number): Promise<Game> => {
        return api.get<Game>(`/games/${id}`);
    },

    create: async (data: CreateGameRequest): Promise<Game> => {
        return api.post<Game>("/games", data);
    },

    update: async (id: number, data: UpdateGameRequest): Promise<Game> => {
        return api.put<Game>(`/games/${id}`, data);
    },

    delete: async (id: number): Promise<void> => {
        await api.delete<{ message: string }>(`/games/${id}`);
    },

    search: async (params: {
        name?: string;
        completed?: boolean;
        platformId?: number;
    }): Promise<Game[]> => {
        const queryParams = new URLSearchParams();
        if (params.name) queryParams.append("name", params.name);
        if (params.completed !== undefined)
            queryParams.append("completed", params.completed.toString());
        if (params.platformId)
            queryParams.append("platformId", params.platformId.toString());

        return api.get<Game[]>(`/games/search?${queryParams.toString()}`);
    },

    pickRandom: async (): Promise<Game> => {
        return api.get<Game>("/games/pick");
    },
};
