import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getUsers = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.users.list, {
        params
    });
    return response.data;
};

export const getUser = async (id: number) => {
    const response = await apiClient.get(endpoints.users.details(id));
    return response.data;
};
export const createUser = async (data: any) => {
    const response = await apiClient.post(endpoints.users.create, data);
    return response.data;
};
export const updateUser = async ({ id, data }: { id: number; data: any }) => {
    const response = await apiClient.put(endpoints.users.update(id), data);
    return response.data;
};
export const updateUserStatus = async (id: number) => {
    const response = await apiClient.put(endpoints.users.update_status(id));
    return response.data;
};
export const deleteUser = async (id: number) => {
    const response = await apiClient.delete(endpoints.users.delete(id));
    return response.data;
};

export const getRoles = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.roles.list, {
        params
    });
    return response.data;
};

export const getCountries = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.countries, { params });
    return response.data;
};
export const uploadFile = async (data: File | FormData, fieldName = 'file') => {
    const form = data instanceof FormData ? data : new FormData();
    if (!(data instanceof FormData)) {
        form.append(fieldName, data);
    }

    // Replace `endpoints.users.upload` with the correct upload endpoint if different
    const response = await apiClient.post(endpoints.upload, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};
