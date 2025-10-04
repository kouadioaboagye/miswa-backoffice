import { httpAuthClient } from "@/lib/http-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../../types";
import { IOwnerDataModel } from "./types";

export const useListOwnersQuery = (): UseQueryResult<APIResponseList<IOwnerDataModel>> => {
    return useQuery({
        queryKey: ['businesses'],
        queryFn: async () => {
            const response = await httpAuthClient().get('/businesses');
            return response.data;
        }
    })
}