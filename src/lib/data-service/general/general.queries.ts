import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getCountries = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.countries, { params });
    return response.data;
};

export const getMunicipalities = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.municipalities, { params });
    return response.data;
};
