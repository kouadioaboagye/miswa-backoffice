'use client';

import { MapPin, Star } from 'lucide-react';
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
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number;
    currency: string;
    description: string;
    images: string[];
    amenities: {
        parking: { available: boolean; count?: number };
        security: { available: boolean; type?: string };
        commonAreas: { available: boolean; details?: string };
        utilities: { available: boolean; status?: string };
        elevator: { available: boolean };
    };
    coordinates: {
        lat: number;
        lng: number;
    };
    reviews: {
        security: number;
        transport: number;
        hygiene: number;
        humidity: number;
        overall: number;
        count: number;
    };
}

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
    // Données mockées - à remplacer par un appel API
    const property: Property = {
        id: propertyId,
        title: 'Appartement 4 pièce (Cité AGC Modeste Grand Bassam)',
        location: "Côte d'ivoire, Grand Bassam",
        rating: 4.5,
        reviewCount: 904,
        price: 120000,
        currency: 'F CFA',
        description:
            '3 AC BEDROOM APARTMENT Full furnished. Stylish Apartment Near Bashundhara R/A Entrance! Block i, R:4. Located right by the main entrance of Bashundhara R/A from 300ft Road and Madani Avenue. Just a 15-minute drive from Dhaka Airport, and only 5 and 10 minutes from the Cantonment and Airport Train Stations, our location is ideal for both business and leisure travelers. Why wait? Your ideal stay is just a click away, Don’t miss out, book now! Safety Features: CCTV surveillance throughout the building and instant generator support. Your Ideal Home in Dhaka. Wants to visit this property for rent, just WhatsApp (+880 1814 963 028) this property link or call us and share your convenient viewing schedule. Whether you’re here for business or leisure, our apartment offers elegant living spaces with refreshing airflow and abundant natural light. Book your stay today and experience the best of Dhaka!   See More',
        images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center'
        ],
        amenities: {
            parking: { available: true, count: 12 },
            security: { available: true, type: 'Gardien' },
            commonAreas: { available: true, details: 'Buanderie, terrasse' },
            utilities: { available: true, status: 'raccordé' },
            elevator: { available: true }
        },
        coordinates: {
            lat: 5.36,
            lng: -4.0083
        },
        reviews: {
            security: 4.8,
            transport: 3.0,
            hygiene: 4.5,
            humidity: 4.0,
            overall: 4.3,
            count: 24
        }
    };

    return (
        <section className="flex justify-center py-20 w-full bg-white sm:max-w-[95%] md:max-w-[90%]">
            <div className="w-full ">
                <PropertyGallery images={property.images} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenu principal - 2/3 de la largeur */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Galerie d'images */}

                        {/* Titre et informations de base */}
                        <div className="space-y-10">
                            <h1 className="text-5xl font-bold text-gray-900">
                                {property.title}
                            </h1>

                            <div className="flex items-center space-x-8">
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-600">
                                        {property.location}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-1 ">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i <
                                                    Math.floor(property.rating)
                                                        ? 'text-yellow-400'
                                                        : i < property.rating
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">
                                        ({property.reviewCount} Avis)
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

                            {/* Commodités */}
                            <PropertyAmenities amenities={property.amenities} />
                        </div>
                    </div>

                    {/* Sidebar - 1/3 de la largeur */}
                    <div className="lg:col-span-1">
                        <PropertySidebar
                            price={property.price}
                            currency={property.currency}
                        />
                    </div>
                </div>

                {/* Géolocalisation */}
                <PropertyLocation coordinates={property.coordinates} />

                {/* Avis */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Avis Visiteur Et Locataire
                    </h2>
                    <PropertyReviews reviews={property.reviews} />
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
