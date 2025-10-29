import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getTenants = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.tenants.list, {
        params
    });
    return response.data;
};
