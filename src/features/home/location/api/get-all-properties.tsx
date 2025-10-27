import apiClient from '@/shared/lib/axios';
import { useQuery } from '@tanstack/react-query';

export type GetAllPropertiesParams = {
    page?: number;
    limit?: number;
    all?: boolean;
    research?: string;
    // Filtres de prix
    min_price?: number;
    max_price?: number;
    price_range?: string;
    // Filtres de caractéristiques
    rooms_count?: number;
    min_area?: number;
    max_area?: number;
    // Filtres géographiques
    municipality_id?: number;
    building_id?: number;
    // Filtres de statut
    is_public?: boolean;
    is_active?: boolean;
    // Recherche textuelle
    search?: string;
};

export const getAllProperties = async (params: GetAllPropertiesParams) => {
    // Essayer d'abord l'endpoint public
    const response = await apiClient.get('/properties/public', {
        params
    });
    return response?.data;
};

export const useGetAllPropertiesQuery = (params: GetAllPropertiesParams) =>
    useQuery({
        queryKey: ['all-properties', params],
        queryFn: () => getAllProperties(params)
    });

// Fonction utilitaire pour construire les paramètres de recherche
export const buildSearchParams = (filters: {
    page?: number;
    limit?: number;
    budgetRange?: [number, number];
    surfaceRange?: [number, number];
    selectedBedrooms?: string;
    selectedCity?: string;
    selectedType?: string;
    selectedBuildingType?: string;
    selectedNeighborhood?: string;
    searchTerm?: string;
    municipalities?: any[];
}) => {
    const params: GetAllPropertiesParams = {
        page: filters.page || 1,
        limit: filters.limit || 20,
        all: true,
        is_public: true,
        is_active: true
    };

    // Paramètres de prix
    if (filters.budgetRange && filters.budgetRange[0] > 0) {
        params.min_price = filters.budgetRange[0];
    }
    if (filters.budgetRange && filters.budgetRange[1] < 1000000) {
        params.max_price = filters.budgetRange[1];
    }

    // Paramètres de surface
    if (filters.surfaceRange && filters.surfaceRange[0] > 0) {
        params.min_area = filters.surfaceRange[0];
    }
    if (filters.surfaceRange && filters.surfaceRange[1] < 1000) {
        params.max_area = filters.surfaceRange[1];
    }

    // Nombre de chambres
    if (filters.selectedBedrooms) {
        params.rooms_count = parseInt(filters.selectedBedrooms);
    }

    // Filtres géographiques
    if (filters.selectedCity && filters.municipalities) {
        const selectedMunicipality = filters.municipalities.find(
            (m: any) => m.name === filters.selectedCity
        );
        if (selectedMunicipality) {
            params.municipality_id = selectedMunicipality.id;
        }
    }

    // Recherche textuelle combinée
    const searchTerms = [];
    if (filters.searchTerm) searchTerms.push(filters.searchTerm);
    if (filters.selectedType) searchTerms.push(filters.selectedType);
    if (filters.selectedBuildingType)
        searchTerms.push(filters.selectedBuildingType);
    if (filters.selectedNeighborhood)
        searchTerms.push(filters.selectedNeighborhood);

    if (searchTerms.length > 0) {
        params.search = searchTerms.join(' ');
    }

    return params;
};

// Fonction de diagnostic pour vérifier la connectivité
export const checkApiConnectivity = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    console.log('🔍 Diagnostic de connectivité API:');
    console.log('📍 URL de base:', baseURL);

    if (!baseURL) {
        console.error(
            "❌ NEXT_PUBLIC_API_URL n'est pas défini dans les variables d'environnement"
        );
        return false;
    }

    try {
        // Test de connectivité basique
        const testUrl = `${baseURL}/properties/public`;
        console.log('🧪 Test de connectivité vers:', testUrl);

        const response = await fetch(testUrl, {
            method: 'GET'
            // timeout: 5000
        });

        console.log('✅ Connectivité OK - Status:', response.status);
        return true;
    } catch (error: any) {
        console.error('❌ Erreur de connectivité:', {
            code: error.code,
            message: error.message,
            hostname: error.hostname || 'N/A'
        });
        return false;
    }
};
