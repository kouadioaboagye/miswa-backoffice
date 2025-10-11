import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";
import { IContractDataModel } from "./types";

export const useListContractsQuery = (): UseQueryResult<APIResponseList<IContractDataModel>> => {
    return useQuery({
        queryKey: ['contracts'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IContractDataModel>>('contracts/', {
                method: 'GET',
            });
        }
    })
}

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