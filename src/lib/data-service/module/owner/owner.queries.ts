import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../../types";
import { APIResponseDashboardOwner, IOwnerDataModel } from "./types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListOwnersQuery = (page: number = 1, limit: number = 10): UseQueryResult<APIResponseList<IOwnerDataModel>> => {
    return useQuery({
        queryKey: ['businesses', page, limit],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IOwnerDataModel>>(`businesses/?page=${page}&limit=${limit}`, {
                method: 'GET',
            });
        },
    });
};

export const useDeleteOwnerMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (ownerId: number) => {
            return await fetchWrapper(`business-owners/${ownerId}/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            // Invalidate and refetch owners list
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
        },
    });
};

export const useGetOwnerByIdQuery = (businessId: string) => {
    return useQuery({
        queryKey: ['business', businessId],
        queryFn: async () => {
            return await fetchWrapper<IOwnerDataModel>(`businesses/${businessId}/`, {
                method: 'GET',
            });
        },
        enabled: !!businessId,
    });
};

export const useDashboardOwnerDataQuery = (): UseQueryResult<APIResponseDashboardOwner> => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseDashboardOwner>(`dashboard/businesses/`, {
                method: 'GET',
            });
        }
    })
}