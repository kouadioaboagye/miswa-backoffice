import { queryClient } from '@/app/provider';
import { ListParams } from '@/features/admin/api/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
    createProperty,
    deleteProperty,
    getAllBuildings,
    getAllProperties,
    getCommodities,
    getPropertyById
} from './property.queries';

const queryKey = {
    properties: 'properties',
    property: 'property',
    buildings: 'buildings',
    commodities: 'commodities'
};

export const useListPropertiesQuery = (params: ListParams) => {
    return useQuery({
        queryKey: [queryKey.properties, params],
        queryFn: () => getAllProperties(params)
    });
};
export const useListComoditiesQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.commodities, params],
        queryFn: () => getCommodities(params)
    });
};

export const useListBuildingsQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.buildings, params],
        queryFn: () => getAllBuildings(params)
    });
};

export const useDeletePropertyMutation = () => {
    return useMutation({
        mutationFn: deleteProperty,
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('Property deleted successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey.properties] });
        },
        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Error deleting property'
            );
        }
    });
};

export const useGetPropertyQuery = (propertyId: string) => {
    return useQuery({
        queryKey: [queryKey.property, propertyId],
        queryFn: () => getPropertyById(propertyId)
    });
};

export const useCreatePropertyMutation = () => {
    return useMutation({
        mutationFn: createProperty,
        onSuccess: () => {
            // Invalidate and refetch properties list
            toast.success('Property created successfully');
            queryClient.invalidateQueries({ queryKey: [queryKey.properties] });
        },

        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Error creating property'
            );
        }
    });
};

// export const useUpdatePropertyMutation = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({
//             propertyId,
//             data
//         }: {
//             propertyId: string;
//             data: Partial<IPropertyDataModel>;
//         }) => {
//             return await fetchWrapper<IPropertyDataModel>(
//                 `properties/${propertyId}/`,
//                 {
//                     method: 'PUT',
//                     body: data
//                 }
//             );
//         },
//         onSuccess: (_, variables) => {
//             // Invalidate and refetch properties list and specific property
//             queryClient.invalidateQueries({ queryKey: ['properties'] });
//             queryClient.invalidateQueries({
//                 queryKey: ['property', variables.propertyId]
//             });
//         }
//     });
// };
