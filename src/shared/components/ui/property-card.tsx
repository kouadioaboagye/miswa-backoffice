'use client';

import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';

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
            className={`h-[340px] w-[300px] shrink-0 overflow-hidden rounded-[40px] bg-white ${className}`}
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
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-white/20 to-white/80 backdrop-blur-sm"></div>

                    {/* Text content */}
                    <div className="relative z-10">
                        {/* Title */}
                        <h3 className="mb-3 text-xl font-bold text-[#1a1a1a]">
                            {title}
                        </h3>

                        {/* Location */}
                        <div className="mb-4 flex items-center gap-2 text-gray-600">
                            <MapPinIcon className="size-4 text-gray-600" />
                            <span className="text-sm">{location}</span>
                        </div>

                        {/* Property Features Grid */}
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                            {/* Rooms */}
                            <div className="flex items-center gap-2">
                                <div className="flex size-5 items-center justify-center">
                                    <svg
                                        className="size-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM5 9h14v6H5V9z" />
                                    </svg>
                                </div>
                                <span>{rooms}</span>
                            </div>

                            {/* Bathrooms */}
                            <div className="flex items-center gap-2">
                                <div className="flex size-5 items-center justify-center">
                                    <svg
                                        className="size-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M9.5 6c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S13.38 9 12 9s-2.5-1.12-2.5-2.5zM12 10.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 1.5c-3.31 0-6 2.69-6 6v3h12v-3c0-3.31-2.69-6-6-6z" />
                                    </svg>
                                </div>
                                <span>{bathrooms}</span>
                            </div>

                            {/* Area */}
                            <div className="flex items-center gap-2">
                                <div className="flex size-5 items-center justify-center">
                                    <svg
                                        className="size-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
                                    </svg>
                                </div>
                                <span>{area}</span>
                            </div>

                            {/* Parking */}
                            <div className="flex items-center gap-2">
                                <div className="flex size-5 items-center justify-center">
                                    <svg
                                        className="size-5 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                    </svg>
                                </div>
                                <span>{parking}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { PropertyCard };
