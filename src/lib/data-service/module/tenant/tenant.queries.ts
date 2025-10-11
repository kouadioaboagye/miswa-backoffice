import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../../types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";
import { ITenantDataModel } from "./types";

export const useListTenantQuery = (): UseQueryResult<APIResponseList<ITenantDataModel>> => {
    return useQuery({
        queryKey: ['tenants'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<ITenantDataModel>>('tenants/', {
                method: 'GET',
            });
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