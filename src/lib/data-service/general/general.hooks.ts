import { ListParams } from '@/features/admin/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { getCountries, getMunicipalities } from './general.queries';

const queryKey = {
    countries: 'countries',
    municipalities: 'municipalities'
};

export const useListCountriesQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.countries, params],
        queryFn: () => getCountries(params)
    });
};

export const useListMunicipalitiesQuery = (params?: ListParams) => {
    return useQuery({
        queryKey: [queryKey.municipalities, params],
        queryFn: () => getMunicipalities(params)
    });
};
