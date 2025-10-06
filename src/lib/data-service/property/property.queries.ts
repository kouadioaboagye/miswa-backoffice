import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPropertyDataModel } from "./types";
import { APIResponseList } from "../types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListPropertiesQuery = (): UseQueryResult<APIResponseList<IPropertyDataModel>> => {
    return useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IPropertyDataModel>>('properties/', {
                method: 'GET',
            });
        }
    })
}