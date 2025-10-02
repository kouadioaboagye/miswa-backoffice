'use client';

import Image from 'next/image';
import { CarIcon } from '../../../../public/assets/icons/car-icon';
import { HomeIcon } from '../../../../public/assets/icons/home-icon';
import { LargeIcon } from '../../../../public/assets/icons/large-icon';
import { MapIcon } from '../../../../public/assets/icons/map-icon';
import { ShowerIcon } from '../../../../public/assets/icons/shower-icon';

export interface PropertyCardProps {
    id: number;
    title: string;
    location: string;
    rooms: string;
    bathrooms: string;
    area: string;
    parking: string;
    image: string;
    className?: string;
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
                        <h3 className="mb-3 mt-3 text-3xl font-bold text-[#14385C]">
                            {title}
                        </h3>

                        {/* Property Features Grid */}
                        <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                            {/* Rooms */}
                            <div className="flex items-center justify-center gap-1">
                                <HomeIcon className="size-8 text-green-600" />
                                <span className="text-[1.2rem]">{rooms}</span>
                            </div>

                            {/* Bathrooms */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <ShowerIcon className="size-8 text-green-600 [&_svg]:size-8" />
                                </div>
                                <span className="text-[1.2rem]">
                                    {bathrooms}
                                </span>
                            </div>

                            {/* Area */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <LargeIcon className="size-8 text-green-600 [&_svg]:size-8" />
                                </div>
                                <span className="text-[1.2rem]">{area}</span>
                            </div>

                            {/* Parking */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <CarIcon className="size-8 text-green-600 [&_svg]:size-8" />
                                </div>
                                <span className="text-[1.2rem]">{parking}</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mb-4 flex items-center gap-2 text-gray-600">
                            <MapIcon className="size-8 text-gray-600" />
                            <span className="text-[1.2rem]">{location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Nouvelle variante pour la grille
const PropertyCardGrid = ({
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
            className={`w-full h-full min-h-[380px] overflow-hidden rounded-[30px] bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
        >
            {/* Image Section */}
            <div className="relative h-4/5 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between">
                {/* Title and Location */}
                <div className="mb-1">
                    <h3 className="text-lg font-bold text-[#14385C] line-clamp-2 mb-1 leading-tight">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600">
                        <MapIcon className="size-4 text-gray-600 flex-shrink-0" />
                        <span className="text-xs line-clamp-1">{location}</span>
                    </div>
                </div>

                {/* Property Features Grid */}
                <div className="grid grid-cols-4 gap-1 text-gray-600">
                    <div className="flex flex-col items-center gap-0.5">
                        <HomeIcon className="size-5 text-green-600" />
                        <span className="text-[10px] text-center leading-tight">{rooms}</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                        <ShowerIcon className="size-5 text-green-600" />
                        <span className="text-[10px] text-center leading-tight">{bathrooms}</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                        <LargeIcon className="size-5 text-green-600" />
                        <span className="text-[10px] text-center leading-tight">{area}</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                        <CarIcon className="size-5 text-green-600" />
                        <span className="text-[10px] text-center leading-tight">{parking}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { PropertyCard, PropertyCardGrid };