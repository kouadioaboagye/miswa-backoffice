"use client"
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
import { OnMapIcon } from '../../../../../public/assets/icons/on-map-icon';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Property {
    id: number;
    name: string;
    description: string;
    cover_url: string;
    reference: string;
    street: string;
    address: string;
    latitude: number;
    longitude: number;
    rooms_count: number;
    likes_count: number;
    views_count: number;
    area_m2: number;
    monthly_rent_amount: number;
    is_busy: boolean;
    photos: string[];
}

interface ApiResponse {
    data: Property[];
    total: number;
}

const PropertiesSection = () => {

    const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour récupérer les propriétés depuis l'API
    const fetchProperties = async () => {
        try {
            setLoading(true);
             
            const response = await fetch('/api/properties', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data: ApiResponse = await response.json();
            setProperties(data.data);
        } catch (err) {
            console.error('Erreur lors du chargement des propriétés:', err);
            setError('Impossible de charger les propriétés');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Fonction pour formater les données de l'API vers le format attendu par PropertyCard
    const formatPropertyForCard = (property: Property) => {
        return {
            id: property.id,
            title: property.name,
            location: property.address || property.street,
            rooms: `${property.rooms_count} Chambre${property.rooms_count > 1 ? 's' : ''}`,
            bathrooms: 'Aucun', // L'API ne semble pas fournir cette information
            area: `${property.area_m2}m²`,
            parking: 'Aucun', // L'API ne semble pas fournir cette information
            image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center",
            // image: property.cover_url || (property.photos.length > 0 ? property.photos[0] : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'),
            price: property.monthly_rent_amount ? `${property.monthly_rent_amount.toLocaleString()} FCFA/mois` : 'Prix non disponible'
        };
    };

    if (loading) {
        return (
            <section className="bg-white py-16 sm:py-20 md:py-24">
                <div className="mx-auto flex max-w-[90%] flex-col gap-12 mt-32">
                    <div className="text-center">Chargement des propriétés...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-white py-16 sm:py-20 md:py-24">
                <div className="mx-auto flex max-w-[90%] flex-col gap-12 mt-32">
                    <div className="text-center text-red-500">{error}</div>
                    <Button onClick={fetchProperties} className="mx-auto">
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
                        {properties.length > 0 ? (
                            <div className=" flex gap-6">
                                {/* Premier set de cartes */}
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={`first-${property.id}`}
                                        {...formatPropertyForCard(property)}
                                    />
                                ))}

                                {/* Deuxième set de cartes pour l'effet infini */}
                                {properties.map((property) => (
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

                {/* Newsletter avec espace pour la superposition */}
                <div className="relative z-0 mx-auto flex flex-col items-center justify-center gap-6 bg-white p-8 pt-20 text-white md:px-12 md:py-20">
                    {/* Bouton Voir les annonces */}
                    <div className="mb-8 text-center mt-48">
                        <Button
                        
                            variant="secondary"
                            size="default"
                            className="px-8 py-3"
                             onClick={() => router.push("/recherche")}
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
