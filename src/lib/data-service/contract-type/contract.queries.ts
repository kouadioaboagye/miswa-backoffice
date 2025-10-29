import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getContractTypes = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.contract_types.list, {
        params
    });
    return response.data;
};
