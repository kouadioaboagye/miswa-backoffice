import { ListParams } from '@/features/admin/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { getTenants } from './tenants.queries';

const queryKey = 'tenants';

export const useListTenantsQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: () => getTenants(params)
    });
};
