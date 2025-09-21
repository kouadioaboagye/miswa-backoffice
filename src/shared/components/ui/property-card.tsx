'use client';

// import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { ShowerIcon } from '../../../../public/assets/icons/shower-icon';
import { LargeIcon } from '../../../../public/assets/icons/large-icon';
import { HomeIcon } from '../../../../public/assets/icons/home-icon';
import { CarIcon } from '../../../../public/assets/icons/car-icon';
import { MapIcon } from '../../../../public/assets/icons/map-icon';

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
            className={`h-[460px] w-[430px] shrink-0 overflow-hidden rounded-[40px] bg-white ${className}`}
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
                            <div className="flex items-center justify-center  gap-1">
                                    <HomeIcon
                                        className="size-8 text-green-600"
                                    />
                                    <span className="text-[1.2rem]">{rooms}</span>
                            </div>

                            {/* Bathrooms */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <ShowerIcon
                                            className="size-8 text-green-600 [&_svg]:size-8"
                                    />
                                    
                                </div>
                                <span className="text-[1.2rem]">{bathrooms}</span>
                            </div>

                            {/* Area */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <LargeIcon
                                        className="size-8 text-green-600 [&_svg]:size-8"
                                    />
                                </div>
                                <span className="text-[1.2rem]">{area}</span>
                            </div>

                            {/* Parking */}
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex size-8 items-center justify-center">
                                    <CarIcon
                                        className="size-8 text-green-600 [&_svg]:size-8"
                                    />
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

export { PropertyCard };
