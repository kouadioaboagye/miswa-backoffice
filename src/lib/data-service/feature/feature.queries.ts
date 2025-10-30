import { fetchWrapper } from "@/lib/http-client/ fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { APIResponseGetFeatures } from "./types";

export const useGetFeaturesQuery = () => {
    return useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            return await fetchWrapper<APIResponseGetFeatures>(`property-features/`, {
                method: 'GET',
            });
        },
    });
}