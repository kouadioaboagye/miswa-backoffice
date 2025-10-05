import { useQuery, UseQueryResult } from "@tanstack/react-query";
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