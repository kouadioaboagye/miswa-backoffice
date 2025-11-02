import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../../types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";
import { ITenantDataModel } from "./types";
import { fakeTenants } from "@/features/admin/module/tenant/components/tables/columns";

export const useListTenantQuery = (page: number = 1, limit: number = 10): UseQueryResult<APIResponseList<ITenantDataModel>> => {
    return useQuery({
        queryKey: ['tenants', page, limit],
        queryFn: async () => {
            // Mock data for 20 tenants
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedData = fakeTenants.slice(start, end);
            return {
                data: paginatedData,
                total: fakeTenants.length,
            } as APIResponseList<ITenantDataModel>;
            // Uncomment for actual API call
            // return await fetchWrapper<APIResponseList<ITenantDataModel>>(`tenants/?page=${page}&limit=${limit}`, {
            //     method: 'GET',
            // });
        }
    });
};

export const useDeleteTenantMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (tenantId: string) => {
            return await fetchWrapper(`tenants/${tenantId}/force/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenants'] });
        },
    });
};

export const useGetTenantByIdQuery = (tenantId: string) => {
    return useQuery({
        queryKey: ['tenant', tenantId],
        queryFn: async () => {
            return await fetchWrapper<ITenantDataModel>(`tenants/${tenantId}/`, {
                method: 'GET',
            });
        },
        enabled: !!tenantId,
    });
};