'use client';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PropertyCard } from '@/shared/components/ui/property-card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OnMapIcon } from '../../../../../public/assets/icons/on-map-icon';
import { useGetAllPropertiesQuery } from '../api/get-all-properties';

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

const PropertiesSection = () => {
    const router = useRouter();

    // Utilisation du hook React Query pour récupérer les propriétés
    const {
        data: propertiesData,
        isLoading: loading,
        error: queryError,
        refetch
    } = useGetAllPropertiesQuery({
        page: 1,
        limit: 20
        // all: true,
        // is_public: true,
        // is_active: true
    });

    console.log('propertiesData', propertiesData);

    const properties = propertiesData?.data || [];
    const error = queryError ? 'Impossible de charger les propriétés' : null;

    // Fonction pour formater les données de l'API vers le format attendu par PropertyCard
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

    if (loading) {
        return (
            <section className="bg-white py-16 sm:py-20 md:py-24">
                <div className="mx-auto flex max-w-[90%] flex-col gap-12 mt-32">
                    <div className="text-center">
                        Chargement des propriétés...
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-white py-16 sm:py-20 md:py-24">
                <div className="mx-auto flex max-w-[90%] flex-col gap-12 mt-32">
                    <div className="text-center text-red-500">{error}</div>
                    <Button onClick={() => refetch()} className="mx-auto">
                        Réessayer
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-16 sm:py-20 md:py-24">
            <div className="mx-auto flex max-w-[90%] flex-col gap-12 mt-32">
                {/* Titre et sous-titre */}
                <div className="mb-12 flex flex-col  gap-2 text-start">
                    <h2 className="mb-4 text-4xl font-bold text-[#14385C] md:text-5xl lg:text-6xl">
                        Bâtiment proches de vous !
                    </h2>
                    <p className="text-lg text-[#6b7280] md:text-2xl">
                        Nous sélectionnons les meilleurs biens près de chez
                        vous.
                    </p>
                </div>

                {/* Barre de recherche */}
                <div className="mb-20 flex w-full items-center justify-between gap-8 sm:gap-6">
                    <div className="flex w-[60%] gap-10">
                        <div className="w-[30%]">
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Grand-Bassam" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grand-bassam">
                                        Grand-Bassam
                                    </SelectItem>
                                    <SelectItem value="abidjan">
                                        Abidjan
                                    </SelectItem>
                                    <SelectItem value="yamoussoukro">
                                        Yamoussoukro
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 w-[70%]">
                            <Input
                                placeholder="Rechercher..."
                                leftIcon={
                                    <SearchIcon className="size-10 text-[#1EA64A]" />
                                }
                            />
                        </div>
                    </div>

                    <Button
                        className="flex items-center gap-2 text-2xl bg-[#14385C] text-white hover:bg-[#1a4a6b]"
                        rightIcon={<OnMapIcon className="size-10 " />}
                        variant="default"
                        size="default"
                        onClick={() => router.push('/recherche-avec-carte')}
                    >
                        Sur la map
                    </Button>
                </div>
            </div>

            {/* Container pour la superposition */}
            <div className="relative">
                {/* Cartes de propriétés - Scroll infini avec superposition */}

                {/* Cartes de propriétés - Scroll infini avec superposition */}
                <div className="relative z-10 -mb-36">
                    <div className="relative overflow-hidden">
                        <div className="animate-scroll-infinite flex gap-6">
                            {properties.length > 0 ? (
                                <div className=" flex gap-6">
                                    {/* Premier set de cartes */}
                                    {properties.map((property: Property) => (
                                        <PropertyCard
                                            key={`first-${property.id}`}
                                            {...formatPropertyForCard(property)}
                                        />
                                    ))}

                                    {/* Deuxième set de cartes pour l'effet infini */}
                                    {properties.map((property: Property) => (
                                        <PropertyCard
                                            key={`second-${property.id}`}
                                            {...formatPropertyForCard(property)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    Aucune propriété disponible pour le moment
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Newsletter avec espace pour la superposition */}
                <div className="relative z-0 mx-auto flex flex-col items-center justify-center gap-6 bg-white p-8 pt-20 text-white md:px-12 md:py-20">
                    {/* Bouton Voir les annonces */}
                    <div className="mb-8 text-center mt-48">
                        <Button
                            variant="secondary"
                            size="default"
                            className="px-8 py-3"
                            onClick={() => router.push('/recherche')}
                        >
                            Voir les annonces
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertiesSection;
