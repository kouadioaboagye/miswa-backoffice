import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../types";

import { IContractDataModel } from "./types";
import { Contract, fakeContracts } from "@/features/admin/components/tables/contract/columns";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListContractsQuery = (
    page: number = 1,
    limit: number = 10,
    status: string = "default"
): UseQueryResult<APIResponseList<Contract>> => {
    return useQuery({
        queryKey: ['contracts', page, limit, status],
        queryFn: async () => {
            // Mock data for 20 contracts
            const start = (page - 1) * limit;
            const end = start + limit;
            let filteredContracts = fakeContracts;
            if (status !== "default") {
                filteredContracts = fakeContracts.filter(contract => contract.status === status);
            }
            const paginatedData = filteredContracts.slice(start, end);
            return {
                data: paginatedData,
                total: filteredContracts.length,
            } as APIResponseList<Contract>;
            // Uncomment for actual API call
            // const query = status === "default" ? `page=${page}&limit=${limit}` : `page=${page}&limit=${limit}&status=${status}`;
            // return await fetchWrapper<APIResponseList<IContractDataModel>>(`contracts/?${query}`, {
            //     method: 'GET',
            // });
        }
    });
};

export const useGetContractByIdQuery = (contractId: string) => {
    return useQuery({
        queryKey: ['contract', contractId],
        queryFn: async () => {
            return await fetchWrapper<IContractDataModel>(`contracts/${contractId}/`, {
                method: 'GET',
            });
        },
        enabled: !!contractId,
    });
};

export const useDeleteContractMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (contractId: string) => {
            return await fetchWrapper(`contracts/${contractId}/`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            // Invalidate and refetch contracts list
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        },
    });
};