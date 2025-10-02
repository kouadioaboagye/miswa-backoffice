'use client';

import { MapPin, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import PropertyAmenities from './property-amenities';
import PropertyGallery from './property-gallery';
import PropertyLocation from './property-location';
import PropertyReviews from './property-reviews';
import PropertySidebar from './property-sidebar';
import SimilarProperties from './similar-properties';

interface PropertyDetailsProps {
    propertyId: string;
}

interface Property {
    id: string;
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
    bathrooms?: number;
    parking?: number;
}

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
    const searchParams = useSearchParams();

    // Récupérer les données depuis l'URL
    const property: Property = {
        id: propertyId,
        name: searchParams.get('name') || 'Propriété',
        description:
            searchParams.get('description') || 'Description non disponible',
        cover_url:
            // searchParams.get('cover_url') ||
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
        reference: searchParams.get('reference') || '',
        street: searchParams.get('street') || '',
        address:
            searchParams.get('address') ||
            searchParams.get('street') ||
            'Adresse non disponible',
        latitude: parseFloat(searchParams.get('latitude') || '5.36'),
        longitude: parseFloat(searchParams.get('longitude') || '-4.0083'),
        rooms_count: parseInt(searchParams.get('rooms_count') || '0'),
        likes_count: parseInt(searchParams.get('likes_count') || '0'),
        views_count: parseInt(searchParams.get('views_count') || '0'),
        area_m2: parseInt(searchParams.get('area_m2') || '0'),
        monthly_rent_amount: parseInt(
            searchParams.get('monthly_rent_amount') || '0'
        ),
        is_busy: searchParams.get('is_busy') === 'true',
        photos: searchParams.get('photos')
            ? searchParams.get('photos')!.split(',')
            : [],
        bathrooms: searchParams.get('bathrooms')
            ? parseInt(searchParams.get('bathrooms')!)
            : undefined,
        parking: searchParams.get('parking')
            ? parseInt(searchParams.get('parking')!)
            : undefined
    };

    return (
        <section className="flex justify-center py-20 w-full bg-white sm:max-w-[95%] md:max-w-[90%]">
            <div className="w-full ">
                <PropertyGallery
                    images={property.photos || [property.cover_url]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenu principal - 2/3 de la largeur */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Galerie d'images */}

                        {/* Titre et informations de base */}
                        <div className="space-y-10">
                            <h1 className="text-5xl font-bold text-gray-900">
                                {property.name}
                            </h1>

                            <div className="flex items-center space-x-8">
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">
                                        {property.address || property.street}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-1 ">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < 4
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">
                                        ({property.likes_count} Avis)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                {property.description}
                            </p>
                            <button className="text-[#1EA64A] font-medium hover:text-[#1a8a3f] transition-colors">
                                Voir plus
                            </button>
                        </div>

                        {/* Informations détaillées */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Détails de la propriété
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600">
                                        Chambres
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {property.rooms_count}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600">
                                        Salles de bain
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {property.bathrooms || 'Aucun'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600">
                                        Surface
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {property.area_m2} m²
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm text-gray-600">
                                        Parking
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {property.parking || 'Aucun'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Commodités */}
                        <PropertyAmenities
                            amenities={{
                                parking: {
                                    available: !!property.parking,
                                    count: property.parking
                                },
                                security: { available: true, type: 'Gardien' },
                                commonAreas: {
                                    available: true,
                                    details: 'Buanderie, terrasse'
                                },
                                utilities: {
                                    available: true,
                                    status: 'raccordé'
                                },
                                elevator: { available: true }
                            }}
                        />
                    </div>

                    {/* Sidebar - 1/3 de la largeur */}
                    <div className="lg:col-span-1">
                        <PropertySidebar
                            price={property.monthly_rent_amount}
                            currency="FCFA"
                            // propertyId={property.id}
                        />
                    </div>
                </div>

                {/* Géolocalisation */}
                <PropertyLocation
                    coordinates={{
                        lat: property.latitude,
                        lng: property.longitude
                    }}
                />

                {/* Avis */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Avis Visiteur Et Locataire
                    </h2>
                    <PropertyReviews
                        reviews={{
                            security: 4.8,
                            transport: 3.0,
                            hygiene: 4.5,
                            humidity: 4.0,
                            overall: 4.3,
                            count: property.likes_count
                        }}
                    />
                </div>

                {/* Propriétés similaires */}
                <div className="mt-16">
                    <SimilarProperties currentPropertyId={property.id} />
                </div>
            </div>
        </section>
    );
};

export default PropertyDetails;
