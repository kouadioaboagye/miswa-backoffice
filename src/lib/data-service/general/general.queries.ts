import { httpAuthClient } from "@/lib/http-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";
import { APIResponseList } from "../types";
import { ICountryDataModel, IMunicipalityDataModel } from "./types";

export const useListCountriesQuery = (): UseQueryResult<APIResponseList<ICountryDataModel>> => {
    return useQuery({
        queryKey: ['countries'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<ICountryDataModel>>('countries/', {
                method: 'GET',
            });
        },
    });
};

export const useListMunicipalitiesQuery = (): UseQueryResult<APIResponseList<IMunicipalityDataModel>> => {
    return useQuery({
        queryKey: ['municipalities'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseList<IMunicipalityDataModel>>('municipalities/', {
                method: 'GET',
            });
        },
    });
};