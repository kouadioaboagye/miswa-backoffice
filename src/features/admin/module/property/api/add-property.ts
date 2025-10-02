import apiClient from "@/shared/lib/axios";

export const addProperty = async (data: { email: string; password: string }) => {
    const response = await apiClient.post('/api/properties', data);
    return response?.data;
};