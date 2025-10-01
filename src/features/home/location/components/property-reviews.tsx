'use client';

import { Button } from '@/shared/components/ui/button';
import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Reviews {
    security: number;
    transport: number;
    hygiene: number;
    humidity: number;
    overall: number;
    count: number;
}

interface PropertyReviewsProps {
    reviews: Reviews;
}

const PropertyReviews = ({ reviews }: PropertyReviewsProps) => {
    const reviewCategories = [
        { key: 'security', label: 'Sécurité', value: reviews.security },
        { key: 'transport', label: 'Transport', value: reviews.transport },
        { key: 'hygiene', label: 'Hygiène', value: reviews.hygiene },
        { key: 'humidity', label: 'Humidité', value: reviews.humidity }
    ];

    const renderProgressBar = (value: number) => {
        const percentage = (value / 5) * 100;
        return (
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        );
    };

    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<
        (typeof locations)[0] | null
    >(null);

    const locations = [
        {
            id: 1,
            name: "École nationale d'administration",
            lat: 5.3599,
            lng: -4.0083,
            type: 'school',
            icon: '🏫'
        },
        {
            id: 2,
            name: 'Palm Club Hôtel',
            lat: 5.352,
            lng: -4.018,
            type: 'hotel',
            icon: '🏨'
        },
        {
            id: 3,
            name: "Église Patmos Dieudonnée Côte d'Ivoire",
            lat: 5.349,
            lng: -4.021,
            type: 'church',
            icon: '⛪'
        },
        {
            id: 4,
            name: 'Galerie Cécile Fakhoury',
            lat: 5.345,
            lng: -4.005,
            type: 'gallery',
            icon: '🎨'
        },
        {
            id: 5,
            name: 'Radiodiffusion Télévision',
            lat: 5.341,
            lng: -4.024,
            type: 'media',
            icon: '📻'
        }
    ];

    const ratings = {
        sécurité: { value: 4.8, max: 5 },
        transport: { value: 3.0, max: 5 },
        hygiène: { value: 4.5, max: 5 },
        humidité: { value: 4.0, max: 5 }
    };

    useEffect(() => {
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }, []);

    const initMap = () => {
        if (!mapRef.current) return;

        const mapInstance = new window.google.maps.Map(mapRef.current, {
            center: { lat: 5.35, lng: -4.015 },
            zoom: 14,
            mapTypeId: 'roadmap',
            styles: [
                {
                    featureType: 'all',
                    elementType: 'all',
                    stylers: [{ saturation: -20 }, { lightness: 10 }]
                }
            ]
        });

        // Custom tile overlay for Mapbox
        const mapboxTileLayer = new window.google.maps.ImageMapType({
            getTileUrl: (coord, zoom) => {
                return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/${zoom}/${coord.x}/${coord.y}?access_token=YOUR_MAPBOX_TOKEN`;
            },
            tileSize: new window.google.maps.Size(256, 256),
            name: 'Mapbox',
            maxZoom: 18
        });

        mapInstance.overlayMapTypes.insertAt(0, mapboxTileLayer);

        // Add markers
        locations.forEach((location) => {
            const marker = new window.google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: mapInstance,
                title: location.name,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor:
                        location.type === 'hotel' ? '#E91E63' : '#F44336',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2
                }
            });

            marker.addListener('click', () => {
                setSelectedLocation(location);
            });
        });

        setMap(mapInstance);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`w-8 h-8 ${
                        i <= Math.floor(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-300 text-gray-300'
                    }`}
                />
            );
        }
        return stars;
    };

    const getRatingColor = (value: number) => {
        if (value >= 4.5) return 'bg-green-500';
        if (value >= 4.0) return 'bg-yellow-500';
        if (value >= 3.0) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="space-y-4 w-full mt-20">
            {/* Reviews Section */}

            <div className="flex flex-col gap-8 py-8">
                <div className="flex flex-row items-end gap-16 h-32">
                    {/* Left: Rating Bars */}
                    <div className="flex-none w-1/3 space-y-5">
                        {Object.entries(ratings).map(([key, data]) => (
                            <div key={key}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-900 font-normal text-md">
                                        {key}
                                    </span>
                                    <span className="text-gray-600 font-normal text-md">
                                        {data.value}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-3 rounded-full ${getRatingColor(
                                            data.value
                                        )}`}
                                        style={{
                                            width: `${
                                                (data.value / data.max) * 100
                                            }%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Middle: Stars and Rating */}
                    <div className="flex justify-start items-end">
                        <div className="flex flex-col items-start gap-4">
                            <h3 className="text-md font-normal text-gray-900">
                                Plus De 24 Avis
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    {renderStars(4.3)}
                                </div>
                                <span className="text-gray-700 font-normal text-xl">
                                    (4.30)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Button */}
                    <div className="ml-auto">
                        <Button variant="secondary" className="">
                            Laisser Un Avis
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyReviews;
