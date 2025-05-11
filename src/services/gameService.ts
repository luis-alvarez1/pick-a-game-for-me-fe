import api from "./api";
import {
    Game,
    CreateGameRequest,
    UpdateGameRequest,
    PaginatedGamesResponse,
} from "../types/api";

class GameService {
    async getAll(): Promise<Game[]> {
        const response = await api.get<Game[]>("/games");
        return response.data;
    }

    async getById(id: number): Promise<Game> {
        const response = await api.get<Game>(`/games/${id}`);
        return response.data;
    }

    async create(data: CreateGameRequest): Promise<Game> {
        const response = await api.post<Game>("/games", data);
        return response.data;
    }

    async update(id: number, data: UpdateGameRequest): Promise<Game> {
        const response = await api.patch<Game>(`/games/${id}`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await api.delete(`/games/${id}`);
    }

    async toggleComplete(id: number, completed: boolean): Promise<Game> {
        const response = await api.patch<Game>(`/games/${id}`, { completed });
        return response.data;
    }

    async pickRandom(): Promise<Game> {
        const response = await api.get<Game>("/games/pick");
        return response.data;
    }

    async search(params: {
        name?: string;
        platformId?: number;
        completed?: boolean;
        page?: number;
        limit?: number;
    }): Promise<PaginatedGamesResponse> {
        const response = await api.get<PaginatedGamesResponse>(
            "/games/search",
            { params }
        );
        return response.data;
    }
}

export const gameService = new GameService();
