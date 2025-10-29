import { ListParams } from '@/features/admin/api/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteBusiness, getOwners } from './owner.queries';

const queryKey = 'businesses';

export const useListOwnersQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: () => getOwners(params)
    });
};

export const useDeleteOwnerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBusiness,
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('Owner deleted successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error) => {
            toast.error(
                error instanceof Error ? error.message : 'Error deleting owner'
            );
        }
    });
};
