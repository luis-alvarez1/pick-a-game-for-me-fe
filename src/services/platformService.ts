import api from "./api";
import { Platform } from "../types/api";

class PlatformService {
    async getAll(): Promise<Platform[]> {
        const response = await api.get<Platform[]>("/platforms");
        return response.data;
    }

    async getById(id: number): Promise<Platform> {
        const response = await api.get<Platform>(`/platforms/${id}`);
        return response.data;
    }

    async create(data: { name: string }): Promise<Platform> {
        const response = await api.post<Platform>("/platforms", data);
        return response.data;
    }

    async update(id: number, data: { name: string }): Promise<Platform> {
        const response = await api.patch<Platform>(`/platforms/${id}`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await api.delete(`/platforms/${id}`);
    }
}

export const platformService = new PlatformService();
