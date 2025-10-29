import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const createBusiness = async (data: any) => {
    const response = await apiClient.post(endpoints.businesses.create, data);
    return response.data;
};
export const deleteBusiness = async (id: number) => {
    const response = await apiClient.delete(endpoints.businesses.delete(id));
    return response.data;
};
export const getOwners = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.businesses.list, {
        params
    });
    return response.data;
};
