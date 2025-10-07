'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CarIcon } from '../../../../public/assets/icons/car-icon';
import { HomeIcon } from '../../../../public/assets/icons/home-icon';
import { LargeIcon } from '../../../../public/assets/icons/large-icon';
import { MapIcon } from '../../../../public/assets/icons/map-icon';
import { ShowerIcon } from '../../../../public/assets/icons/shower-icon';

// export interface PropertyCardProps {
//     id: number;
//     title: string;
//     location: string;
//     rooms: string;
//     bathrooms: string;
//     area: string;
//     parking: string;
//     image: string;
//     className?: string;
// }

export interface PropertyCardProps {
    id?: string | number;
    title: string;
    location: string;
    price?: string;
    rooms: string;
    bathrooms: string;
    area: string;
    parking?: string;
    image: string;
    className?: string;
    isFeatured?: boolean;
    onFavorite?: () => void;
    isFavorited?: boolean;
    // Propriétés supplémentaires pour les détails
    description?: string;
    cover_url?: string;
    reference?: string;
    street?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    rooms_count?: number;
    likes_count?: number;
    views_count?: number;
    area_m2?: number;
    monthly_rent_amount?: number;
    is_busy?: boolean;
    photos?: string[];
}
// Version originale (conservée pour le scroll horizontal)
const PropertyCard = ({
    title,
    location,
    rooms,
    bathrooms,
    area,
    parking,
    image,
    className = ''
}: PropertyCardProps) => {
    return (
        <div
            className={`h-[400px] w-[400px] shrink-0 overflow-hidden rounded-[40px] m-2 bg-white ${className}`}
        >
            {/* Image Section with Blur Effect */}
            <div className="relative size-full">
                {/* Background Image - Clear */}
                <div className="absolute inset-0 size-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Overlay with Details - Blur only on text area */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                    {/* Blurred background only for text area */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-white/100 to-white/90 backdrop-blur-sm"></div>

                    {/* Text content */}
                    <div className="relative z-10">
                        {/* Title */}
                        <h3 className="mb-3 mt-3 text font-bold text-[#14385C]">
                            {title}
                        </h3>

                        {/* Property Features Grid */}
                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                            {/* Rooms */}
                            <div className="flex items-center justify-center gap-1">
                                <HomeIcon className="size-10 text-green-600" />
                                <span className="text-[1.5rem]">{rooms}</span>
                            </div>

                            {/* Bathrooms */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <ShowerIcon className="size-10 text-green-600 [&_svg]:size-8" />
                                </div>
                                <span className="text-[1.5rem]">
                                    {bathrooms}
                                </span>
                            </div>

                            {/* Area */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <LargeIcon className="size-10 text-green-600 [&_svg]:size-8" />
                                </div>
                                <span className="text-[1.5rem]">{area}</span>
                            </div>

                            {/* Parking */}
                            <div className="flex items-center justify-center gap-1">
                                <div className="flex size-8 items-center justify-left">
                                    <CarIcon className="size-10 text-green-600" />
                                </div>
                                <span className="text-[1.5rem]">{parking}</span>
                            </div>
                        </div>


                        {/* Location */}
                        <div className="mb-4 flex items-center gap-2 text-gray-600">
                            <MapIcon className="size-8 text-gray-600" />
                            <span className="text-[1.5rem]">{location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Nouvelle variante pour la grille

const PropertyCardGrid = ({
    id,
    title,
    location,
    price,
    rooms,
    bathrooms,
    area,
    parking,
    image,
    className = '',
    isFeatured = false,
    onFavorite,
    isFavorited = false,
    // Propriétés supplémentaires
    description,
    cover_url,
    reference,
    street,
    address,
    latitude,
    longitude,
    rooms_count,
    likes_count,
    views_count,
    area_m2,
    monthly_rent_amount,
    is_busy,
    photos
}: PropertyCardProps) => {
    const router = useRouter();
    return (
        <div
            className={`group relative w-full min-h-[320px] overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
        >
            {/* Badge Featured */}
            {isFeatured && (
                <div className="absolute top-4 left-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-xl font-bold">
                    Featured
                </div>
            )}

            {/* Bouton Favori */}
            {onFavorite && (
                <button
                    onClick={onFavorite}
                    className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                >
                    <HeartIcon
                        className={`size-5 transition-colors duration-200 ${
                            isFavorited
                                ? 'text-red-500 fill-red-500'
                                : 'text-gray-600'
                        }`}
                    />
                </button>
            )}

            {/* Section Image */}
            <div className="relative h-96 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Overlay avec dégradé */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Prix en overlay */}
                {price && (
                    <div className="absolute bottom-4 left-4 z-10">
                        <span className="bg-white/90 backdrop-blur-sm text-[#14385C] font-bold px-3 py-2 rounded-xl text-[1.2rem]">
                            {price}
                        </span>
                    </div>
                )}
            </div>

            {/* Section Contenu */}
            <div className="p-5 space-y-4">
                {/* Titre et Localisation */}
                <div className="space-y-2">
                    <h3 className="font-bold text-[#14385C] line-clamp-2 leading-tight group-hover:text-[#1e5a9e] transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-start gap-2 text-gray-600">
                        <MapPinIcon className="size-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xl line-clamp-2 leading-relaxed">
                            {location}
                        </span>
                    </div>
                </div>

                {/* Caractéristiques */}
                <div className="grid grid-cols-4 gap-3 border-t border-gray-100 pt-4">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <HomeIcon className="size-15 text-[#14385C]" />
                        <span className="text-xl font-medium text-gray-700">
                            {rooms}
                        </span>
                        <span className="text-[15px] text-gray-500">
                            Chambres
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center">
                        <ShowerIcon className="size-6 text-[#14385C]" />
                        <span className="text-xl font-medium text-gray-700">
                            {bathrooms}
                        </span>
                        <span className="text-[15px] text-gray-500">SDB</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center">
                        <SquareIcon className="size-6 text-[#14385C]" />
                        <span className="text-xl font-medium text-gray-700">
                            {area}
                        </span>
                        <span className="text-[15px] text-gray-500">
                            Surface
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center">
                        <CarIcon className="size-6 text-[#14385C]" />
                        <span className="text-xl font-medium text-gray-700">
                            {parking || 'N/A'}
                        </span>
                        <span className="text-[15px] text-gray-500">
                            Parking
                        </span>
                    </div>
                </div>

                {/* Bouton Action */}
                <button
                    onClick={() => {
                        const params = new URLSearchParams();
                        if (description) params.set('description', description);
                        if (cover_url) params.set('cover_url', cover_url);
                        if (reference) params.set('reference', reference);
                        if (street) params.set('street', street);
                        if (address) params.set('address', address);
                        if (latitude)
                            params.set('latitude', latitude.toString());
                        if (longitude)
                            params.set('longitude', longitude.toString());
                        if (rooms_count)
                            params.set('rooms_count', rooms_count.toString());
                        if (likes_count)
                            params.set('likes_count', likes_count.toString());
                        if (views_count)
                            params.set('views_count', views_count.toString());
                        if (area_m2) params.set('area_m2', area_m2.toString());
                        if (monthly_rent_amount)
                            params.set(
                                'monthly_rent_amount',
                                monthly_rent_amount.toString()
                            );
                        if (is_busy !== undefined)
                            params.set('is_busy', is_busy.toString());
                        if (photos && photos.length > 0)
                            params.set('photos', photos.join(','));
                        if (bathrooms)
                            params.set('bathrooms', bathrooms.toString());
                        if (parking) params.set('parking', parking.toString());
                        params.set('name', title);

                        router.push(`/propriete/${id}?${params.toString()}`);
                    }}
                    className="w-full bg-gradient-to-r from-[#14385C] to-[#1e5a9e] text-white py-3 rounded-xl font-semibold text-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Voir les détails
                </button>
            </div>
        </div>
    );
};

// Icônes de remplacement (à remplacer par vos propres icônes)
const MapPinIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
    </svg>
);

const SquareIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
    </svg>
);

export { PropertyCard, PropertyCardGrid };
