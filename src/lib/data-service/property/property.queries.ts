import { httpAuthClient, httpClient } from "../../http-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPropertyDataModel } from "./types";
import { APIResponseList } from "../types";

export const useListPropertiesQuery = (): UseQueryResult<APIResponseList<IPropertyDataModel>> => {
    return useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const response = await httpAuthClient().get('/properties/');
            return response.data;
        }
    })
}