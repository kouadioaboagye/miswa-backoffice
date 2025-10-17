import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../types";
import { APIResponseGetBuilding, IBuildingDataModel } from "./types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

export const useListBuildingsQuery = (page: number = 1, limit: number = 10): UseQueryResult<APIResponseList<IBuildingDataModel>> => {
    return useQuery({
        queryKey: ['buildings'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IBuildingDataModel>>(`buildings//?page=${page}&limit=${limit}`, {
                method: 'GET',
            });
        }
    })
}

export const useGetBuildingByIdQuery = (buildingId: string) => {
    return useQuery({
        queryKey: ['building', buildingId],
        queryFn: async () => {
            return await fetchWrapper<APIResponseGetBuilding>(`buildings/${buildingId}/`, {
                method: 'GET',
            });
        },
        enabled: !!buildingId,
    });
};