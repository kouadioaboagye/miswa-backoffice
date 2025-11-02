import { useQuery } from '@tanstack/react-query';
import { getStats } from './dashboard.queries';

const queryKey = 'dashboard-stats';
export const useGetDashboardQuery = () => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: () => getStats()
    });
};
