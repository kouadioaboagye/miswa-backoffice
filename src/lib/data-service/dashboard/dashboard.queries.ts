import { endpoints } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getStats = async () => {
    const response = await apiClient.get(endpoints.dashboard);
    return response.data;
};
