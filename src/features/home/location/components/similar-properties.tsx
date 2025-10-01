'use client';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '../../../../../public/assets/icons/home-icon';
import { LargeIcon } from '../../../../../public/assets/icons/large-icon';
import { ShowerIcon } from '../../../../../public/assets/icons/shower-icon';

interface SimilarProperty {
    id: string;
    title: string;
    location: string;
    price: number;
    currency: string;
    image: string;
    bedrooms: number;
    bathrooms: number;
    surface: string;
    tag: string;
}

interface SimilarPropertiesProps {
    currentPropertyId: string;
}

const SimilarProperties = ({ currentPropertyId }: SimilarPropertiesProps) => {
    const router = useRouter();

    // Données mockées des propriétés similaires
    const similarProperties: SimilarProperty[] = [
        {
            id: '1',
            title: 'Cité AGC',
            location: '2699 Green Valley, Highland Lake, FL',
            price: 200000,
            currency: 'F CFA',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop&crop=center',
            bedrooms: 3,
            bathrooms: 2,
            surface: '12x9 m²',
            tag: 'Grand-Bassam'
        },
        {
            id: '2',
            title: 'Cité AGC',
            location: '2699 Green Valley, Highland Lake, FL',
            price: 200000,
            currency: 'F CFA',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop&crop=center',
            bedrooms: 3,
            bathrooms: 2,
            surface: '12x9 m²',
            tag: 'Grand-Bassam'
        },
        {
            id: '3',
            title: 'Cité AGC',
            location: '2699 Green Valley, Highland Lake, FL',
            price: 200000,
            currency: 'F CFA',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop&crop=center',
            bedrooms: 3,
            bathrooms: 2,
            surface: '12x9 m²',
            tag: 'Grand-Bassam'
        },
        {
            id: '4',
            title: 'Cité AGC',
            location: '2699 Green Valley, Highland Lake, FL',
            price: 200000,
            currency: 'F CFA',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop&crop=center',
            bedrooms: 3,
            bathrooms: 2,
            surface: '12x9 m²',
            tag: 'Grand-Bassam'
        }
    ];

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ` ${currency}`;
    };

    const handlePropertyClick = (propertyId: string) => {
        router.push(`/propriete/${propertyId}`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
                Sur Le Même Appartement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProperties.map((property) => (
                    <div
                        key={property.id}
                        onClick={() => handlePropertyClick(property.id)}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                    >
                        {/* Image */}
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-[#1EA64A] text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {property.tag}
                                </span>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-bold text-[#1EA64A]">
                                    {formatPrice(
                                        property.price,
                                        property.currency
                                    )}{' '}
                                    / Mois
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#1EA64A] transition-colors">
                                    {property.title}
                                </h3>
                                <div className="flex items-center space-x-1 mt-1">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-[1.3rem] text-gray-600">
                                        {property.location}
                                    </span>
                                </div>
                            </div>

                            {/* <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{property.bedrooms} Cham.</span>
                                <span>{property.bathrooms} Douches</span>
                                <span>{property.surface}</span>
                            </div> */}
                            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                                {/* Rooms */}
                                <div className="flex items-center justify-center">
                                    <HomeIcon className="size-8 text-green-600" />
                                    <span className="flex items-center text-[1.2rem]">
                                        {property.bedrooms} Cham.
                                    </span>
                                </div>

                                {/* Bathrooms */}
                                <div className="flex items-center justify-center">
                                    <div className="flex size-8 items-center justify-center">
                                        <ShowerIcon className="size-8 text-green-600 [&_svg]:size-8" />
                                    </div>
                                    <span className="flex items-center gap-1 text-[1.2rem]">
                                        {property.bathrooms}{' '}
                                        <span className="text-gray-600">
                                            Douches
                                        </span>
                                    </span>
                                </div>

                                {/* Area */}
                                <div className="flex items-center justify-center">
                                    <div className="flex size-8 items-center justify-center">
                                        <LargeIcon className="size-8 text-green-600 [&_svg]:size-8" />
                                    </div>
                                    <span className="flex items-center text-[1.2rem]">
                                        {property.surface}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarProperties;
