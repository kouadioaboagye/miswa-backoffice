'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Déclaration globale pour Google Maps
declare global {
    interface Window {
        google: typeof google;
    }
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface PropertyLocationProps {
    coordinates: Coordinates;
}

const PropertyLocation = ({ coordinates }: PropertyLocationProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);

    // Points d'intérêt autour de la propriété (données mockées)
    const pointsOfInterest = [
        { name: 'Palm Club Hôtel', lat: 5.36, lng: -4.0083 },
        { name: 'Eglise Patmos', lat: 5.365, lng: -4.01 },
        { name: 'Station Petro Ivoire riviera 2', lat: 5.355, lng: -4.005 },
        { name: 'ABIDJAN 06', lat: 5.37, lng: -4.012 },
        { name: 'ABIDJAN 22', lat: 5.35, lng: -4.006 }
    ];

    // Quartiers environnants
    const neighborhoods = [
        'BERTÉ',
        'VIEUX COCODY',
        'MERMOZ',
        'RIVIÉRA 2',
        'ABIDJAN 06',
        'ABIDJAN 22'
    ];

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const initializeMap = () => {
            // Vérifier que Google Maps est chargé
            if (typeof window.google === 'undefined' || !window.google.maps) {
                console.log('Google Maps not loaded yet, retrying...');
                setTimeout(initializeMap, 100);
                return;
            }

            // Initialiser la carte Google Maps avec des tuiles Mapbox
            const map = new window.google.maps.Map(mapRef.current!, {
                center: { lat: coordinates.lat, lng: coordinates.lng },
                zoom: 13,
                mapTypeId: 'custom_mapbox',
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'geometry.fill',
                        stylers: [{ color: '#f5f5f5' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#c9c9c9' }]
                    },
                    {
                        featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [{ color: '#e5e5e5' }]
                    }
                ]
            });

            // Définir le type de carte personnalisé avec Mapbox
            const mapboxTileType = new window.google.maps.ImageMapType({
                getTileUrl: (coord, zoom) => {
                    // Utiliser les tuiles Mapbox
                    const mapboxAccessToken =
                        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
                        'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
                    const mapboxStyleId = 'mapbox/streets-v11';

                    return `https://api.mapbox.com/styles/v1/${mapboxStyleId}/tiles/${zoom}/${coord.x}/${coord.y}?access_token=${mapboxAccessToken}`;
                },
                tileSize: new window.google.maps.Size(256, 256),
                maxZoom: 18,
                name: 'Mapbox Streets'
            });

            map.mapTypes.set('custom_mapbox', mapboxTileType);
            mapInstanceRef.current = map;

            // Marqueur de la propriété
            new window.google.maps.Marker({
                position: { lat: coordinates.lat, lng: coordinates.lng },
                map: map,
                title: 'Propriété',
                icon: {
                    url:
                        'data:image/svg+xml;charset=UTF-8,' +
                        encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#1EA64A"/>
                    </svg>
                `),
                    scaledSize: new window.google.maps.Size(32, 32),
                    anchor: new window.google.maps.Point(16, 16)
                }
            });

            // Marqueurs des points d'intérêt
            pointsOfInterest.forEach((point) => {
                new window.google.maps.Marker({
                    position: { lat: point.lat, lng: point.lng },
                    map: map,
                    title: point.name,
                    icon: {
                        url:
                            'data:image/svg+xml;charset=UTF-8,' +
                            encodeURIComponent(`
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ef4444"/>
                        </svg>
                    `),
                        scaledSize: new window.google.maps.Size(24, 24),
                        anchor: new window.google.maps.Point(12, 12)
                    }
                });
            });
        };

        initializeMap();
    }, [coordinates, pointsOfInterest]);

    return (
        <div className="space-y-4 my-20">
            <h2 className="flex items-center gap-1 text-4xl font-bold text-gray-900">
                <MapPin className="w-8 h-8 text-gray-500" />
                Géolocalisation
            </h2>

            <div className="bg-gray-100 rounded-2xl p-6">
                {/* Carte Google Maps avec tuiles Mapbox */}
                <div
                    ref={mapRef}
                    className="h-[400px] rounded-lg overflow-hidden"
                    style={{ minHeight: '400px' }}
                />

                {/* Quartiers */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {neighborhoods.map((neighborhood, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                        >
                            {neighborhood}
                        </div>
                    ))}
                </div>

                {/* Légende */}
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-[#1EA64A] rounded-full"></div>
                        <span>Propriété</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Points d&apos;intérêt</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyLocation;
