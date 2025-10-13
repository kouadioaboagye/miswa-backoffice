import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../../types";
import { IOwnerDataModel } from "./types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListOwnersQuery = (): UseQueryResult<APIResponseList<IOwnerDataModel>> => {
    return useQuery({
        queryKey: ['businesses'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IOwnerDataModel>>('businesses/', {
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