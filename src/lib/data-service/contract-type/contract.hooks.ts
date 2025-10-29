import { ListParams } from '@/features/admin/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { getContractTypes } from './contract.queries';

const queryKey = 'contract-types';

export const useListContractTypesQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: () => getContractTypes(params)
    });
};
