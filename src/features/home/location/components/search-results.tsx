'use client';

import { SearchIcon } from '@/shared/components/atoms/icons/search-icon';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import Pagination from '@/shared/components/ui/pagination';
import { PropertyCardGrid } from '@/shared/components/ui/property-card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/shared/components/ui/tabs';
import {
    useNeighborhoods,
    useSearchData
} from '@/shared/hooks/use-search-data';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { MiswaLoading } from '../../../../../public/assets/icons/miswa-loading';
import {
    buildSearchParams,
    useGetAllPropertiesQuery
} from '../api/get-all-properties';

interface SearchFilters {
    city: string;
    neighborhood?: string;
    propertyType?: string;
    budgetMin: number;
    budgetMax: number;
    buildingType?: string;
    rooms_count?: number;
    surfaceMin?: number;
    surfaceMax?: number;
    search?: string;
}

interface Property {
    id: number;
    name: string;
    description: string;
    cover_url: string;
    reference: string;
    street: string;
    address: string;
    google_plus_code: string;
    latitude: number;
    longitude: number;
    rooms_count: number;
    likes_count: number;
    views_count: number;
    building_steps_level: number;
    built_year: number;
    area_m2: number;
    monthly_rent_amount: number;
    is_busy: boolean;
    is_public: boolean;
    busy_until: string;
    is_active: boolean;
    is_banned: boolean;
    photos: string[];
    videos: string[];
    official_documents: string[];
    building: {
        name: string;
        description: string;
        cover_url: string;
        street: string;
        address: string;
        longitude: number;
        latitude: number;
        photos: string[];
        is_public: boolean;
        building_type: string;
        city: string;
        construction_year: number;
        total_area: number;
        amenities: string[];
        floors_count: number;
        document_urls: string[];
        id: number;
        id_business: number;
        id_municipality: number;
        business: {
            name: string;
            description: string;
            cover_url: string;
            document_urls: string[];
            is_default: boolean;
            id: number;
            country: {
                name: string;
                flag_url: string;
                phone_code: string;
                country_code: string;
                id: number;
            };
            is_active: boolean;
            created_at: string;
            updated_at: string;
        };
        municipality: {
            name: string;
            id: number;
            id_country: number;
            country: {
                name: string;
                flag_url: string;
                phone_code: string;
                country_code: string;
                id: number;
            };
        };
    };
    municipality: {
        name: string;
        id: number;
        id_country: number;
        country: {
            name: string;
            flag_url: string;
            phone_code: string;
            country_code: string;
            id: number;
        };
    };
    created_at: string;
    updated_at: string;
    features: Array<{
        name: string;
        description: string;
        cover_url: string;
        id: number;
    }>;
    phonenumbers: string[];
}

interface ApiResponse {
    data: Property[];
    total: number;
}

const SearchResults = () => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

    // États pour les critères de recherche
    const [activeTab, setActiveTab] = useState('budget');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [budgetRange, setBudgetRange] = useState([100000, 400000]);
    const [selectedBuildingType, setSelectedBuildingType] = useState('');
    const [selectedBedrooms, setSelectedBedrooms] = useState('');
    const [surfaceRange, setSurfaceRange] = useState([50, 200]);

    const [filteredProperties, setFilteredProperties] = useState<Property[]>(
        []
    );

    // Charger les données de référence
    const {
        municipalities,
        propertyTypes,
        buildingTypes,
        priceRanges,
        surfaceRanges,
        roomOptions,
        isLoading: isLoadingData,
        isError: isErrorData
    } = useSearchData();

    // Utilisation du hook React Query pour récupérer les propriétés
    const {
        data: propertiesData,
        isLoading: loading,
        error: queryError,
        refetch
    } = useGetAllPropertiesQuery(
        buildSearchParams({
            page: currentPage,
            limit: itemsPerPage,
            budgetRange: budgetRange as [number, number],
            surfaceRange: surfaceRange as [number, number],
            selectedBedrooms,
            selectedCity,
            selectedType,
            selectedBuildingType,
            selectedNeighborhood,
            searchTerm,
            municipalities:
                municipalities.data && Array.isArray(municipalities.data)
                    ? municipalities.data
                    : []
        })
    );

    const properties = propertiesData?.data || [];
    const totalCount = propertiesData?.total || 0;
    const error = queryError ? 'Impossible de charger les propriétés' : null;

    // Charger les quartiers selon la ville sélectionnée
    const selectedCityId =
        municipalities.data && Array.isArray(municipalities.data)
            ? municipalities.data.find((m: any) => m.name === selectedCity)?.id
            : undefined;
    const neighborhoods = useNeighborhoods(selectedCityId);

    // Charger les paramètres depuis l'URL au montage du composant
    useEffect(() => {
        const city = searchParams.get('city') || '';
        const neighborhood = searchParams.get('neighborhood') || '';
        const propertyType = searchParams.get('propertyType') || '';
        const budgetMin = parseInt(searchParams.get('budgetMin') || '100000');
        const budgetMax = parseInt(searchParams.get('budgetMax') || '400000');
        const buildingType = searchParams.get('buildingType') || '';
        const bedrooms = searchParams.get('bedrooms') || '';
        const surfaceMin = parseInt(searchParams.get('surfaceMin') || '50');
        const surfaceMax = parseInt(searchParams.get('surfaceMax') || '200');

        setSelectedCity(city);
        setSelectedNeighborhood(neighborhood);
        setSelectedType(propertyType);
        setBudgetRange([budgetMin, budgetMax]);
        setSelectedBuildingType(buildingType);
        setSelectedBedrooms(bedrooms);
        setSurfaceRange([surfaceMin, surfaceMax]);
    }, [searchParams]);

    const formatPropertyForCard = (property: Property) => {
        // Utiliser la vraie image de couverture ou la première photo disponible
        const getImageUrl = () => {
            if (property.cover_url && property.cover_url !== '') {
                return property.cover_url;
            }
            if (property.photos && property.photos.length > 0) {
                return property.photos[0];
            }
            // Image de fallback seulement si aucune image n'est disponible
            return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center';
        };

        // Utiliser l'adresse du bâtiment si disponible, sinon celle de la propriété
        const getLocation = () => {
            if (property.address && property.address !== '') {
                return property.address;
            }
            if (property.street && property.street !== '') {
                return property.street;
            }
            if (
                property.building?.address &&
                property.building.address !== ''
            ) {
                return property.building.address;
            }
            if (property.building?.street && property.building.street !== '') {
                return property.building.street;
            }
            if (property.municipality?.name) {
                return property.municipality.name;
            }
            return 'Adresse non disponible';
        };

        // Compter les salles de bain depuis les features
        const getBathroomsCount = () => {
            if (!property.features || property.features.length === 0) {
                return 'N/A';
            }
            const bathroomFeatures = property.features.filter(
                (feature) =>
                    feature.name.toLowerCase().includes('baignoire') ||
                    feature.name.toLowerCase().includes('douche') ||
                    feature.name.toLowerCase().includes('salle de bain')
            );
            return bathroomFeatures.length > 0
                ? `${bathroomFeatures.length}`
                : 'N/A';
        };

        // Compter les places de parking depuis les features
        const getParkingCount = () => {
            if (!property.features || property.features.length === 0) {
                return 'N/A';
            }
            const parkingFeatures = property.features.filter(
                (feature) =>
                    feature.name.toLowerCase().includes('parking') ||
                    feature.name.toLowerCase().includes('garage')
            );
            return parkingFeatures.length > 0
                ? `${parkingFeatures.length}`
                : 'N/A';
        };

        return {
            id: property.id,
            title: property.name,
            location: getLocation(),
            rooms: `${property.rooms_count} Chambre${
                property.rooms_count > 1 ? 's' : ''
            }`,
            bathrooms: getBathroomsCount(),
            area: `${property.area_m2}m²`,
            parking: getParkingCount(),
            image: getImageUrl(),
            price:
                property.monthly_rent_amount && property.monthly_rent_amount > 0
                    ? `${property.monthly_rent_amount.toLocaleString()} FCFA/mois`
                    : 'Prix sur demande',
            // Propriétés supplémentaires pour les détails
            description: property.description,
            cover_url: property.cover_url,
            reference: property.reference,
            street: property.street,
            address: property.address,
            latitude: property.latitude,
            longitude: property.longitude,
            rooms_count: property.rooms_count,
            likes_count: property.likes_count,
            views_count: property.views_count,
            area_m2: property.area_m2,
            monthly_rent_amount: property.monthly_rent_amount,
            is_busy: property.is_busy,
            photos: property.photos,
            features: property.features,
            building: property.building,
            municipality: property.municipality
        };
    };

    const allArticles = [
        {
            id: '1',
            title: 'Nouvelle réglementation immobilière : ce qui change en 2024',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '15 Jan 2024',
            category: 'Réglementation',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Marie Dubois'
        },
        {
            id: '2',
            title: 'Tendances du marché locatif : hausse des prix dans les grandes villes',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '12 Jan 2024',
            category: 'Marché',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Pierre Martin'
        },
        {
            id: '3',
            title: 'Innovation : la réalité virtuelle révolutionne les visites immobilières',
            excerpt:
                "VillaLorem Ipsum has been the industry's standard dummy text ever since the 1500s, Rents in Dubai have Reached an All-Time High",
            date: '10 Jan 2024',
            category: 'ÉTUDE DE MARCHÉ',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Sophie Laurent'
        },
        {
            id: '4',
            title: 'Conseils pratiques : optimiser votre dossier de location',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '8 Jan 2024',
            category: 'Conseils',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Thomas Bernard'
        },
        {
            id: '5',
            title: 'Investissement locatif : les zones les plus rentables en 2024',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '5 Jan 2024',
            category: 'Investissement',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Claire Moreau'
        },
        {
            id: '6',
            title: 'Écologie et immobilier : les logements verts ont le vent en poupe',
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: '3 Jan 2024',
            category: 'Écologie',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: 'Alexandre Petit'
        },
        // Dupliquer les articles pour avoir plus de contenu
        ...Array.from({ length: 24 }, (_, i) => ({
            id: `${i + 7}`,
            title: `Article ${i + 7} : Tendances du marché immobilier`,
            excerpt:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            date: `${(i % 30) + 1} Jan 2024`,
            category:
                i % 3 === 0
                    ? 'Marché'
                    : i % 3 === 1
                    ? 'Conseils'
                    : 'ÉTUDE DE MARCHÉ',
            image:
                i % 3 === 0
                    ? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
                    : i % 3 === 1
                    ? 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
                    : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            author: `Auteur ${i + 1}`
        }))
    ];

    // Filtrer les articles selon le terme de recherche
    const filteredArticles = allArticles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fonction pour construire les filtres à partir des états
    const buildFilters = useCallback((): SearchFilters => {
        const filters: SearchFilters = {
            city: selectedCity,
            budgetMin: budgetRange[0],
            budgetMax: budgetRange[1],
            surfaceMin: surfaceRange[0],
            surfaceMax: surfaceRange[1]
        };

        // Ajouter les filtres spécifiques selon l'onglet actif
        if (activeTab === 'budget') {
            filters.neighborhood = selectedNeighborhood;
            filters.propertyType = selectedType;
        } else if (activeTab === 'batiment') {
            filters.buildingType = selectedBuildingType;
            filters.rooms_count = selectedBedrooms
                ? parseInt(selectedBedrooms)
                : undefined;
        }

        return filters;
    }, [
        selectedCity,
        budgetRange,
        surfaceRange,
        activeTab,
        selectedNeighborhood,
        selectedType,
        selectedBuildingType,
        selectedBedrooms
    ]);

    // Fonction pour déclencher la recherche

    // Mettre à jour les propriétés filtrées quand les données changent
    useEffect(() => {
        setFilteredProperties(properties);
    }, [properties]);

    // États pour la pagination backend
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // React Query se chargera automatiquement de refetch avec la nouvelle page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Gestion des erreurs de chargement des données de référence
    if (isErrorData) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center text-red-500 py-16">
                    Erreur lors du chargement des données de référence
                </div>
                <Button
                    onClick={() => window.location.reload()}
                    className="mx-auto"
                >
                    Réessayer
                </Button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center text-red-500 py-16">{error}</div>
                <Button onClick={() => refetch()} className="mx-auto">
                    Réessayer
                </Button>
            </div>
        );
    }

    return (
        <section className="w-full bg-white py-20">
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto sm:w-[95%] md:w-[90%]">
                {/* Header avec barre de recherche */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-20">
                    <div>
                        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">
                            Rechercher des propriétés à louer
                        </h1>
                        <p className="text-gray-600">
                            {filteredProperties.length} propriété
                            {filteredProperties.length > 1 ? 's' : ''} trouvée
                            {filteredProperties.length > 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="w-full lg:w-80 mt-4 lg:mt-0">
                        <Input
                            leftIcon={<SearchIcon />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher dans les résultats..."
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Barre de recherche avec onglets */}
                <div className="relative z-10 bg-white pr-12 rounded-[25px] pt-12 w-full mx-auto mb-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        {/* Onglets */}
                        <div className="w-[400px] text-white flex gap-1 mb-6 absolute -top-12 px-8 rounded-full bg-[#0E4D79] py-6 left-0">
                            <TabsList className="w-full bg-[#0E4D79]">
                                <TabsTrigger
                                    value="budget"
                                    className="data-[state=active]:bg-white data-[state=active]:text-[#0E4D79] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white h-full py-6 rounded-full  font-semibold transition-colors"
                                >
                                    Par budget
                                </TabsTrigger>
                                <TabsTrigger
                                    value="batiment"
                                    className="data-[state=active]:bg-white data-[state=active]:text-[#0E4D79] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white h-full py-6 rounded-full font-semibold transition-colors"
                                >
                                    Bâtiment
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Champs de recherche - Onglet Budget */}
                        <TabsContent value="budget" className="mt-0">
                            <div className="flex flex-col items-center mt-2 h-full p-6 md:flex-row gap-4 rounded-[12px] border border-[#1EA64A]">
                                {/* Champ Ville */}
                                <div className="flex-1">
                                    <label className="block font-medium text-gray-700 mb-2">
                                        Ville
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedCity}
                                            onValueChange={(value) => {
                                                setSelectedCity(value);
                                                setSelectedNeighborhood(''); // Reset quartier quand ville change
                                            }}
                                            disabled={municipalities.isLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        municipalities.isLoading
                                                            ? 'Chargement...'
                                                            : 'Sélectionner une ville'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {municipalities.data &&
                                                Array.isArray(
                                                    municipalities.data
                                                )
                                                    ? municipalities.data.map(
                                                          (
                                                              municipality: any
                                                          ) => (
                                                              <SelectItem
                                                                  key={
                                                                      municipality.id
                                                                  }
                                                                  value={
                                                                      municipality.name
                                                                  }
                                                              >
                                                                  {
                                                                      municipality.name
                                                                  }
                                                              </SelectItem>
                                                          )
                                                      )
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Quartier */}
                                <div className="flex-1">
                                    <label className="block  font-medium text-gray-700 mb-2">
                                        Quartier
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedNeighborhood}
                                            onValueChange={
                                                setSelectedNeighborhood
                                            }
                                            disabled={
                                                !selectedCity ||
                                                neighborhoods.isLoading
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        !selectedCity
                                                            ? "Sélectionnez d'abord une ville"
                                                            : neighborhoods.isLoading
                                                            ? 'Chargement...'
                                                            : 'Sélectionner un quartier'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {neighborhoods.data &&
                                                Array.isArray(
                                                    neighborhoods.data
                                                )
                                                    ? neighborhoods.data.map(
                                                          (
                                                              neighborhood: any
                                                          ) => (
                                                              <SelectItem
                                                                  key={
                                                                      neighborhood.id
                                                                  }
                                                                  value={
                                                                      neighborhood.name
                                                                  }
                                                              >
                                                                  {
                                                                      neighborhood.name
                                                                  }
                                                              </SelectItem>
                                                          )
                                                      )
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Type */}
                                <div className="flex-1">
                                    <label className="block  font-medium text-gray-700 mb-2">
                                        Type
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedType}
                                            onValueChange={setSelectedType}
                                            disabled={propertyTypes.isLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        propertyTypes.isLoading
                                                            ? 'Chargement...'
                                                            : 'Sélectionner un type'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {propertyTypes.data &&
                                                Array.isArray(
                                                    propertyTypes.data
                                                )
                                                    ? propertyTypes.data.map(
                                                          (type: any) => (
                                                              <SelectItem
                                                                  key={type.id}
                                                                  value={
                                                                      type.name
                                                                  }
                                                              >
                                                                  {type.name}
                                                              </SelectItem>
                                                          )
                                                      )
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Budget */}
                                <div className="flex-1">
                                    <label className="block  font-medium text-gray-700 mb-2">
                                        Budget
                                    </label>
                                    <div className="relative">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 min-w-[50px]">
                                                {Math.round(
                                                    budgetRange[0] / 1000
                                                )}
                                                k
                                            </span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                                                {/* Piste de sélection */}
                                                <div
                                                    className="absolute top-0 h-2 bg-[#1EA64A] rounded-full"
                                                    style={{
                                                        left: `${
                                                            ((budgetRange[0] -
                                                                50000) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`,
                                                        width: `${
                                                            ((budgetRange[1] -
                                                                budgetRange[0]) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`
                                                    }}
                                                ></div>

                                                {/* Poignée gauche */}
                                                <input
                                                    type="range"
                                                    min="50000"
                                                    max="500000"
                                                    step="10000"
                                                    value={budgetRange[0]}
                                                    onChange={(e) => {
                                                        const newMin = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMin <
                                                            budgetRange[1]
                                                        ) {
                                                            setBudgetRange([
                                                                newMin,
                                                                budgetRange[1]
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />

                                                {/* Poignée droite */}
                                                <input
                                                    type="range"
                                                    min="50000"
                                                    max="500000"
                                                    step="10000"
                                                    value={budgetRange[1]}
                                                    onChange={(e) => {
                                                        const newMax = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMax >
                                                            budgetRange[0]
                                                        ) {
                                                            setBudgetRange([
                                                                budgetRange[0],
                                                                newMax
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />

                                                {/* Poignées visuelles */}
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((budgetRange[0] -
                                                                50000) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((budgetRange[1] -
                                                                50000) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-xl text-gray-500 min-w-[50px]">
                                                {Math.round(
                                                    budgetRange[1] / 1000
                                                )}
                                                k
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton Rechercher */}
                                <Button
                                    variant="secondary"
                                    size="default"
                                    className="transition-colors shadow-md shadow-[#1ea64a]"
                                    onClick={() => refetch()}
                                >
                                    Rechercher
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Champs de recherche - Onglet Bâtiment */}
                        <TabsContent value="batiment" className="mt-0">
                            <div className="flex flex-col items-center mt-2 h-full p-6 md:flex-row gap-4 rounded-[12px] border border-[#1EA64A]">
                                {/* Champ Ville */}
                                <div className="flex-1">
                                    <label className="block font-medium text-gray-700 mb-2">
                                        Ville
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedCity}
                                            onValueChange={(value) => {
                                                setSelectedCity(value);
                                                setSelectedNeighborhood(''); // Reset quartier quand ville change
                                            }}
                                            disabled={municipalities.isLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        municipalities.isLoading
                                                            ? 'Chargement...'
                                                            : 'Sélectionner une ville'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {municipalities.data &&
                                                Array.isArray(
                                                    municipalities.data
                                                )
                                                    ? municipalities.data.map(
                                                          (
                                                              municipality: any
                                                          ) => (
                                                              <SelectItem
                                                                  key={
                                                                      municipality.id
                                                                  }
                                                                  value={
                                                                      municipality.name
                                                                  }
                                                              >
                                                                  {
                                                                      municipality.name
                                                                  }
                                                              </SelectItem>
                                                          )
                                                      )
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Type de Bâtiment */}
                                <div className="flex-1">
                                    <label className="block font-medium text-gray-700 mb-2">
                                        Type de Bâtiment
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedBuildingType}
                                            onValueChange={
                                                setSelectedBuildingType
                                            }
                                            disabled={buildingTypes.isLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        buildingTypes.isLoading
                                                            ? 'Chargement...'
                                                            : 'Sélectionner un type'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {buildingTypes.data &&
                                                Array.isArray(
                                                    buildingTypes.data
                                                )
                                                    ? buildingTypes.data.map(
                                                          (type: any) => (
                                                              <SelectItem
                                                                  key={type.id}
                                                                  value={
                                                                      type.name
                                                                  }
                                                              >
                                                                  {type.name}
                                                              </SelectItem>
                                                          )
                                                      )
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Nombre de Chambres */}
                                <div className="flex-1">
                                    <label className="block  font-medium text-gray-700 mb-2">
                                        Chambres
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedBedrooms}
                                            onValueChange={setSelectedBedrooms}
                                            disabled={roomOptions.isLoading}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={
                                                        roomOptions.isLoading
                                                            ? 'Chargement...'
                                                            : 'Sélectionner le nombre'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roomOptions.data &&
                                                Array.isArray(roomOptions.data)
                                                    ? roomOptions.data.map(
                                                          (option: any) => (
                                                              <SelectItem
                                                                  key={
                                                                      option.id
                                                                  }
                                                                  value={
                                                                      option.value
                                                                  }
                                                              >
                                                                  {option.label}
                                                              </SelectItem>
                                                          )
                                                      )
                                                    : null}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Surface */}
                                <div className="flex-1">
                                    <label className="block  font-medium text-gray-700 mb-2">
                                        Surface (m²)
                                    </label>
                                    <div className="relative">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 min-w-[50px]">
                                                {surfaceRange[0]}m²
                                            </span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                                                {/* Piste de sélection */}
                                                <div
                                                    className="absolute top-0 h-2 bg-[#1EA64A] rounded-full"
                                                    style={{
                                                        left: `${
                                                            ((surfaceRange[0] -
                                                                20) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`,
                                                        width: `${
                                                            ((surfaceRange[1] -
                                                                surfaceRange[0]) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`
                                                    }}
                                                ></div>

                                                {/* Poignée gauche */}
                                                <input
                                                    type="range"
                                                    min="20"
                                                    max="300"
                                                    step="5"
                                                    value={surfaceRange[0]}
                                                    onChange={(e) => {
                                                        const newMin = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMin <
                                                            surfaceRange[1]
                                                        ) {
                                                            setSurfaceRange([
                                                                newMin,
                                                                surfaceRange[1]
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />

                                                {/* Poignée droite */}
                                                <input
                                                    type="range"
                                                    min="20"
                                                    max="300"
                                                    step="5"
                                                    value={surfaceRange[1]}
                                                    onChange={(e) => {
                                                        const newMax = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMax >
                                                            surfaceRange[0]
                                                        ) {
                                                            setSurfaceRange([
                                                                surfaceRange[0],
                                                                newMax
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />

                                                {/* Poignées visuelles */}
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((surfaceRange[0] -
                                                                20) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((surfaceRange[1] -
                                                                20) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-xl text-gray-500 min-w-[50px]">
                                                {surfaceRange[1]}m²
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton Rechercher */}
                                <Button
                                    variant="secondary"
                                    size="default"
                                    className="transition-colors shadow-md shadow-[#1ea64a]"
                                    onClick={() => refetch()}
                                >
                                    Rechercher
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex flex-col items-center w-full pt-12">
                    {/* Indicateur de chargement des données de référence */}
                    {isLoadingData && (
                        <div className="flex size-full items-center justify-center h-[200px] z-50 bg-opacity-40">
                            <div className="text-center">
                                <MiswaLoading className="size-16 mx-auto mb-4" />
                                <p className="text-gray-600">
                                    Chargement des données de référence...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Grille de propriétés */}
                    {loading && !isLoadingData && (
                        <div className="flex size-full items-center justify-center h-[500px] z-50 bg-opacity-40">
                            <MiswaLoading className="size-24" />
                        </div>
                    )}
                    <div className="w-full mb-12">
                        {filteredProperties.length === 0 && !loading ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🏠</div>
                                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                    Aucune propriété trouvée
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Essayez de modifier vos critères de
                                    recherche
                                </p>
                                <Button
                                    onClick={() => refetch()}
                                    className="bg-[#1EA64A] hover:bg-[#1a8a3e] text-white"
                                >
                                    Actualiser la recherche
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                {filteredProperties.map((property) => (
                                    <PropertyCardGrid
                                        key={property.id}
                                        {...formatPropertyForCard(property)}
                                        className="hover:scale-105 transition-transform duration-300"
                                        // Propriétés supplémentaires pour les détails
                                        description={property.description}
                                        cover_url={property.cover_url}
                                        reference={property.reference}
                                        street={property.street}
                                        address={property.address}
                                        latitude={property.latitude}
                                        longitude={property.longitude}
                                        rooms_count={property.rooms_count}
                                        likes_count={property.likes_count}
                                        views_count={property.views_count}
                                        area_m2={property.area_m2}
                                        monthly_rent_amount={
                                            property.monthly_rent_amount
                                        }
                                        is_busy={property.is_busy}
                                        photos={property.photos}
                                        features={property.features}
                                        building={property.building}
                                        municipality={property.municipality}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default SearchResults;
