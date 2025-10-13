import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { APIResponseList } from "../types";
import { IBuildingDataModel, IBuildingDetailsModel } from "./types";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";

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

export const useGetBuildingByIdQuery = (buildingId: string) => {
    return useQuery({
        queryKey: ['building', buildingId],
        queryFn: async () => {
            return await fetchWrapper<IBuildingDetailsModel>(`buildings/${buildingId}/`, {
                method: 'GET',
            });
        },
        enabled: !!buildingId,
    });
};