import { endpoints, ListParams } from '@/features/admin/api/endpoints';
import apiClient from '@/shared/lib/axios';

export const getContracts = async (params?: ListParams) => {
    const response = await apiClient.get(endpoints.contract.list, {
        params
    });
    return response.data;
};

export const createContract = async (data: any) => {
    const response = await apiClient.post(endpoints.contract.create, data);
    return response.data;
};

export const updateContract = async (contractId: string, data: any) => {
    const response = await apiClient.put(
        endpoints.contract.update(contractId),
        data
    );
    return response.data;
};
