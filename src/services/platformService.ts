import { api } from "./api";
import { Platform } from "../types/api";

export const platformService = {
    getAll: async (): Promise<Platform[]> => {
        return api.get<Platform[]>("/platforms");
    },

    getById: async (id: number): Promise<Platform> => {
        return api.get<Platform>(`/platforms/${id}`);
    },

    create: async (data: Omit<Platform, "id">): Promise<Platform> => {
        return api.post<Platform>("/platforms", data);
    },

    update: async (id: number, data: Partial<Platform>): Promise<Platform> => {
        return api.patch<Platform>(`/platforms/${id}`, data);
    },

    delete: async (id: number): Promise<void> => {
        return api.delete(`/platforms/${id}`);
    },
};
