import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { APIResponseDashboardProperty, IAssetDataModel, IBuildingDataModel } from "./types";
import { APIResponseList } from "../types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListPropertiesQuery = (page: number = 1, limit: number = 10): UseQueryResult<APIResponseList<IAssetDataModel>> => {
    return useQuery({
        queryKey: ['properties', page, limit],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IAssetDataModel>>(`properties/?page=${page}&limit=${limit}`, {
                method: 'GET',
            });
        }
    })
}

export const useListBuildingsQuery = (): UseQueryResult<APIResponseList<IBuildingDataModel>> => {
    return useQuery({
        queryKey: ['buildings'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IBuildingDataModel>>('buildings/', {
                method: 'GET',
            });
        }
    })
}

export const useDeletePropertyMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (propertyId: string) => {
            return await fetchWrapper(`properties/${propertyId}/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            // Invalidate and refetch properties list
            queryClient.invalidateQueries({ queryKey: ['properties'] });
        },
    });
}

export const useGetPropertyQuery = (propertyId: string) => {
    return useQuery({
        queryKey: ['property', propertyId],
        queryFn: async () => {
            return await fetchWrapper<IAssetDataModel>(`properties/${propertyId}/`, {
                method: 'GET',
            });
        },
        enabled: !!propertyId,
    });
}

export const useUpdatePropertyMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ propertyId, data }: { propertyId: string; data: Partial<IAssetDataModel> }) => {
            return await fetchWrapper<IAssetDataModel>(`properties/${propertyId}/`, {
                method: 'PUT',
                body: data,
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['properties'] });
            queryClient.invalidateQueries({ queryKey: ['property', variables.propertyId] });
        },
    });
}

export const useDashboardPropertyDataQuery = (): UseQueryResult<APIResponseDashboardProperty> => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseDashboardProperty>(`dashboard/properties/`, {
                method: 'GET',
            });
        }
    })
}