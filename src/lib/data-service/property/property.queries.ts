import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getAllProperties = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.property.list, {
        params
    });
    return response.data;
};
export const getCommodities = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.property.comodity, {
        params
    });
    return response.data;
};
export const getAllBuildings = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.property.buildings, {
        params
    });
    return response.data;
};

export const getPropertyById = async (propertyId: string) => {
    const response = await apiClient.get(endpoints.property.detail(propertyId));
    return response.data;
};

export const createProperty = async (data: any) => {
    const response = await apiClient.post(endpoints.property.create, data);
    return response.data;
};

export const updateProperty = async (propertyId: string, data: any) => {
    const response = await apiClient.put(
        endpoints.property.update(propertyId),
        data
    );
    return response.data;
};

export const deleteProperty = async (propertyId: string) => {
    const response = await apiClient.delete(
        endpoints.property.delete(propertyId)
    );
    return response.data;
};
