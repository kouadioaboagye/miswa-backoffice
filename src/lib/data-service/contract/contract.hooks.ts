import { ListParams } from '@/features/admin/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { getContracts } from './contract.queries';

const queryKey = 'contracts';

export const useListContractsQuery = (params: ListParams) => {
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: () => getContracts(params)
    });
};
