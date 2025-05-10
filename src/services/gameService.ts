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
        page?: number;
        limit?: number;
    }): Promise<import("../types/api").PaginatedGamesResponse> => {
        const queryParams = new URLSearchParams();
        if (params.name) queryParams.append("name", params.name);
        if (params.completed !== undefined)
            queryParams.append("completed", params.completed.toString());
        if (params.platformId)
            queryParams.append("platformId", params.platformId.toString());
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        return api.get<import("../types/api").PaginatedGamesResponse>(
            `/games/search?${queryParams.toString()}`
        );
    },

    pickRandom: async (): Promise<Game> => {
        return api.get<Game>("/games/pick");
    },
};
