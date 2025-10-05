import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IBuildingDataModel, IPropertyDataModel } from "./types";
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