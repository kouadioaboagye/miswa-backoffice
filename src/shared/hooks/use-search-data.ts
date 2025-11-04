import apiClient from '@/shared/lib/axios';
import { useQuery } from '@tanstack/react-query';

// Types pour les données de référence
export interface Municipality {
    id: number;
    name: string;
    id_country: number;
    country: {
        name: string;
        flag_url: string;
        phone_code: string;
        country_code: string;
        id: number;
    };
}

export interface Neighborhood {
    id: number;
    name: string;
    municipality_id: number;
}

export type PropertyType = string;

export type BuildingType = string;

export interface PriceRange {
    min: number;
    max: number | null;
    label: string;
    count: number;
}

export interface SurfaceRange {
    min: number;
    max: number | null;
    label: string;
    count: number;
}

export type RoomOption = number;

// Hook pour récupérer les municipalités
export const useMunicipalities = () => {
    return useQuery({
        queryKey: ['municipalities'],
        queryFn: async (): Promise<Municipality[]> => {
            const response = await apiClient.get('/municipalities/');
            // L'API renvoie { data: Municipality[], pagination: {...} }
            return response.data.data || [];
        }
    });
};

// Hook pour récupérer les quartiers par municipalité
export const useNeighborhoods = (municipalityId?: number) => {
    return useQuery({
        queryKey: ['neighborhoods', municipalityId],
        queryFn: async (): Promise<Neighborhood[]> => {
            const params = municipalityId
                ? { municipality_id: municipalityId }
                : {};
            const response = await apiClient.get('/neighborhoods/', { params });
            return response.data.data || response.data;
        },
        enabled: !!municipalityId // Ne s'exécute que si municipalityId est fourni
    });
};

// Hook pour récupérer les types de propriétés
export const usePropertyTypes = () => {
    return useQuery({
        queryKey: ['property-types'],
        queryFn: async (): Promise<PropertyType[]> => {
            const response = await apiClient.get('/properties/property-types/');
            // L'API renvoie directement un tableau de strings
            return response.data || [];
        }
    });
};

// Hook pour récupérer les types de bâtiments
export const useBuildingTypes = () => {
    return useQuery({
        queryKey: ['building-types'],
        queryFn: async (): Promise<BuildingType[]> => {
            const response = await apiClient.get('/properties/building-types/');
            // L'API renvoie directement un tableau de strings
            return response.data || [];
        }
    });
};

// Hook pour récupérer les plages de prix
export const usePriceRanges = () => {
    return useQuery({
        queryKey: ['price-ranges'],
        queryFn: async (): Promise<PriceRange[]> => {
            const response = await apiClient.get('/properties/price-ranges/');
            // L'API renvoie directement un tableau d'objets
            return response.data || [];
        }
    });
};

// Hook pour récupérer les plages de surface
export const useSurfaceRanges = () => {
    return useQuery({
        queryKey: ['surface-ranges'],
        queryFn: async (): Promise<SurfaceRange[]> => {
            const response = await apiClient.get('/properties/surface-ranges/');
            // L'API renvoie directement un tableau d'objets
            return response.data || [];
        }
    });
};

// Hook pour récupérer les options de chambres
export const useRoomOptions = () => {
    return useQuery({
        queryKey: ['room-options'],
        queryFn: async (): Promise<RoomOption[]> => {
            const response = await apiClient.get('/properties/room-options/');
            // L'API renvoie directement un tableau de nombres
            return response.data || [];
        }
    });
};

// Hook combiné pour toutes les données de recherche
export const useSearchData = () => {
    const municipalities = useMunicipalities();
    const propertyTypes = usePropertyTypes();
    const buildingTypes = useBuildingTypes();
    const priceRanges = usePriceRanges();
    const surfaceRanges = useSurfaceRanges();
    const roomOptions = useRoomOptions();

    return {
        municipalities,
        propertyTypes,
        buildingTypes,
        priceRanges,
        surfaceRanges,
        roomOptions,
        isLoading:
            municipalities.isLoading ||
            propertyTypes.isLoading ||
            buildingTypes.isLoading ||
            priceRanges.isLoading ||
            surfaceRanges.isLoading ||
            roomOptions.isLoading,
        isError:
            municipalities.isError ||
            propertyTypes.isError ||
            buildingTypes.isError ||
            priceRanges.isError ||
            surfaceRanges.isError ||
            roomOptions.isError
    };
};
