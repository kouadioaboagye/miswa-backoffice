'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import Pagination from '@/shared/components/ui/pagination';
import { PropertyCardGrid } from '@/shared/components/ui/property-card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/shared/components/ui/tabs';
import { Grid, List, SearchIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Déclaration globale pour Google Maps
declare global {
    interface Window {
        google: typeof google;
    }
}

interface SearchFilters {
    city: string;
    neighborhood?: string;
    propertyType?: string;
    budgetMin: number;
    budgetMax: number;
    buildingType?: string;
    bedrooms?: number;
    surfaceMin?: number;
    surfaceMax?: number;
}

const SearchWithMap = () => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const itemsPerPage = 12;
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);

    // États pour les critères de recherche
    const [activeTab, setActiveTab] = useState('budget');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [budgetRange, setBudgetRange] = useState([100000, 400000]);
    const [selectedBuildingType, setSelectedBuildingType] = useState('');
    const [selectedBedrooms, setSelectedBedrooms] = useState('');
    const [surfaceRange, setSurfaceRange] = useState([50, 200]);

    // Charger les paramètres depuis l'URL au montage du composant
    useEffect(() => {
        const city = searchParams.get('city') || '';
        const neighborhood = searchParams.get('neighborhood') || '';
        const propertyType = searchParams.get('propertyType') || '';
        const budgetMin = parseInt(searchParams.get('budgetMin') || '100000');
        const budgetMax = parseInt(searchParams.get('budgetMax') || '400000');
        const buildingType = searchParams.get('buildingType') || '';
        const bedrooms = searchParams.get('bedrooms') || '';
        const surfaceMin = parseInt(searchParams.get('surfaceMin') || '50');
        const surfaceMax = parseInt(searchParams.get('surfaceMax') || '200');

        setSelectedCity(city);
        setSelectedNeighborhood(neighborhood);
        setSelectedType(propertyType);
        setBudgetRange([budgetMin, budgetMax]);
        setSelectedBuildingType(buildingType);
        setSelectedBedrooms(bedrooms);
        setSurfaceRange([surfaceMin, surfaceMax]);
    }, [searchParams]);

    // Données mockées des propriétés
    const allProperties = [
        {
            id: '1',
            title: 'Appartement moderne à Cocody',
            price: '200 000 FCFA',
            location: 'Cocody, Abidjan',
            bedrooms: 3,
            bathrooms: 2,
            area: '120 m²',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            coordinates: { lat: 5.3599, lng: -4.0083 },
            description:
                'Appartement moderne et spacieux dans le quartier de Cocody',
            reference: 'REF001',
            street: 'Rue des Jardins',
            address: 'Cocody, Abidjan',
            latitude: 5.3599,
            longitude: -4.0083,
            rooms_count: 3,
            likes_count: 15,
            views_count: 120,
            area_m2: 120,
            monthly_rent_amount: 200000,
            is_busy: false,
            photos: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
            ]
        },
        {
            id: '2',
            title: 'Villa spacieuse à Marcory',
            price: '350 000 FCFA',
            location: 'Marcory, Abidjan',
            bedrooms: 4,
            bathrooms: 3,
            area: '180 m²',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            coordinates: { lat: 5.352, lng: -4.018 },
            description:
                'Villa spacieuse avec jardin dans le quartier de Marcory',
            reference: 'REF002',
            street: 'Avenue de la Paix',
            address: 'Marcory, Abidjan',
            latitude: 5.352,
            longitude: -4.018,
            rooms_count: 4,
            likes_count: 22,
            views_count: 180,
            area_m2: 180,
            monthly_rent_amount: 350000,
            is_busy: false,
            photos: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
            ]
        },
        {
            id: '3',
            title: 'Studio cosy à Plateau',
            price: '120 000 FCFA',
            location: 'Plateau, Abidjan',
            bedrooms: 1,
            bathrooms: 1,
            area: '45 m²',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            coordinates: { lat: 5.349, lng: -4.021 },
            description: 'Studio moderne et fonctionnel au Plateau',
            reference: 'REF003',
            street: 'Boulevard de la République',
            address: 'Plateau, Abidjan',
            latitude: 5.349,
            longitude: -4.021,
            rooms_count: 1,
            likes_count: 8,
            views_count: 95,
            area_m2: 45,
            monthly_rent_amount: 120000,
            is_busy: false,
            photos: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
            ]
        },
        {
            id: '4',
            title: 'Appartement avec terrasse',
            price: '280 000 FCFA',
            location: 'Riviera, Abidjan',
            bedrooms: 3,
            bathrooms: 2,
            area: '140 m²',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            coordinates: { lat: 5.345, lng: -4.005 },
            description: 'Appartement avec terrasse privée à Riviera',
            reference: 'REF004',
            street: 'Rue de la Riviera',
            address: 'Riviera, Abidjan',
            latitude: 5.345,
            longitude: -4.005,
            rooms_count: 3,
            likes_count: 18,
            views_count: 150,
            area_m2: 140,
            monthly_rent_amount: 280000,
            is_busy: false,
            photos: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
            ]
        },
        // Dupliquer pour avoir plus de contenu
        ...Array.from({ length: 20 }, (_, i) => ({
            id: `${i + 5}`,
            title: `Propriété ${i + 5}`,
            price: `${150000 + i * 10000} FCFA`,
            location: `Quartier ${i + 1}, Abidjan`,
            bedrooms: (i % 4) + 1,
            bathrooms: Math.ceil(((i % 4) + 1) / 2),
            area: `${60 + i * 5} m²`,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            coordinates: {
                lat: 5.35 + (Math.random() - 0.5) * 0.1,
                lng: -4.01 + (Math.random() - 0.5) * 0.1
            },
            description: `Description de la propriété ${i + 5}`,
            reference: `REF${String(i + 5).padStart(3, '0')}`,
            street: `Rue ${i + 1}`,
            address: `Quartier ${i + 1}, Abidjan`,
            latitude: 5.35 + (Math.random() - 0.5) * 0.1,
            longitude: -4.01 + (Math.random() - 0.5) * 0.1,
            rooms_count: (i % 4) + 1,
            likes_count: Math.floor(Math.random() * 30) + 5,
            views_count: Math.floor(Math.random() * 200) + 50,
            area_m2: 60 + i * 5,
            monthly_rent_amount: 150000 + i * 10000,
            is_busy: Math.random() > 0.7,
            photos: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
            ]
        }))
    ];

    // Filtrer les propriétés selon le terme de recherche
    const filteredProperties = allProperties.filter(
        (property) =>
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer la pagination
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initialiser la carte Google Maps
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const initializeMap = () => {
            if (typeof window.google === 'undefined' || !window.google.maps) {
                console.log('Google Maps not loaded yet, retrying...');
                setTimeout(initializeMap, 100);
                return;
            }

            const map = new window.google.maps.Map(mapRef.current!, {
                center: { lat: 5.35, lng: -4.01 },
                zoom: 12,
                mapTypeId: 'custom_mapbox',
                mapTypeControl: true,
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

            // Ajouter des marqueurs pour chaque propriété
            filteredProperties.forEach((property) => {
                new window.google.maps.Marker({
                    position: property.coordinates,
                    map: map,
                    title: property.title,
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
            });
        };

        initializeMap();
    }, [filteredProperties]);

    return (
        <div className="min-h-screen bg-white">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Header avec barre de recherche */}
                <div className="flex justify-center mb-8">
                    <h1 className="text-6xl text-center font-bold text-[#1a1a1a] py-16">
                        Rechercher des propriétés à louer
                    </h1>
                    {/* <p className="text-gray-600">
                            {filteredProperties.length} propriété
                            {filteredProperties.length > 1 ? 's' : ''} trouvée
                            {filteredProperties.length > 1 ? 's' : ''}
                        </p> */}
                </div>

                {/* Barre de recherche avec onglets */}
                <div className="relative z-10 bg-white pr-12 rounded-[25px] pt-12 w-full mx-auto mb-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        {/* Onglets */}
                        <div className="w-[400px] text-white flex gap-1 mb-6 absolute -top-10 px-8 rounded-full bg-[#0E4D79] py-6 left-0">
                            <TabsList className="w-full bg-[#0E4D79]">
                                <TabsTrigger
                                    value="budget"
                                    className="data-[state=active]:bg-white data-[state=active]:text-[#0E4D79] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white h-full py-6 rounded-full text-2xl font-semibold transition-colors"
                                >
                                    Par budget
                                </TabsTrigger>
                                <TabsTrigger
                                    value="batiment"
                                    className="data-[state=active]:bg-white data-[state=active]:text-[#0E4D79] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white h-full py-6 rounded-full text-2xl font-semibold transition-colors"
                                >
                                    Bâtiment
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Champs de recherche - Onglet Budget */}
                        <TabsContent value="budget" className="mt-0">
                            <div className="flex flex-col items-center mt-2 h-full p-6 md:flex-row gap-4 rounded-[12px] border border-[#1EA64A]">
                                {/* Champ Ville */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Ville
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedCity}
                                            onValueChange={setSelectedCity}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Grand-Bassam" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Grand-Bassam">
                                                    Grand-Bassam
                                                </SelectItem>
                                                <SelectItem value="Abidjan">
                                                    Abidjan
                                                </SelectItem>
                                                <SelectItem value="Yamoussoukro">
                                                    Yamoussoukro
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Quartier */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Quartier
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedNeighborhood}
                                            onValueChange={
                                                setSelectedNeighborhood
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Cocody" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Cocody">
                                                    Cocody
                                                </SelectItem>
                                                <SelectItem value="Plateau">
                                                    Plateau
                                                </SelectItem>
                                                <SelectItem value="Marcory">
                                                    Marcory
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Type */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Type
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedType}
                                            onValueChange={setSelectedType}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Appartement" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Appartement">
                                                    Appartement
                                                </SelectItem>
                                                <SelectItem value="Maison">
                                                    Maison
                                                </SelectItem>
                                                <SelectItem value="Studio">
                                                    Studio
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Budget */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Budget
                                    </label>
                                    <div className="relative">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl text-gray-500 min-w-[50px]">
                                                {Math.round(
                                                    budgetRange[0] / 1000
                                                )}
                                                k
                                            </span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                                                <div
                                                    className="absolute top-0 h-2 bg-[#1EA64A] rounded-full"
                                                    style={{
                                                        left: `${
                                                            ((budgetRange[0] -
                                                                50000) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`,
                                                        width: `${
                                                            ((budgetRange[1] -
                                                                budgetRange[0]) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`
                                                    }}
                                                ></div>
                                                <input
                                                    type="range"
                                                    min="50000"
                                                    max="500000"
                                                    step="10000"
                                                    value={budgetRange[0]}
                                                    onChange={(e) => {
                                                        const newMin = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMin <
                                                            budgetRange[1]
                                                        ) {
                                                            setBudgetRange([
                                                                newMin,
                                                                budgetRange[1]
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />
                                                <input
                                                    type="range"
                                                    min="50000"
                                                    max="500000"
                                                    step="10000"
                                                    value={budgetRange[1]}
                                                    onChange={(e) => {
                                                        const newMax = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMax >
                                                            budgetRange[0]
                                                        ) {
                                                            setBudgetRange([
                                                                budgetRange[0],
                                                                newMax
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />
                                            </div>
                                            <span className="text-xl text-gray-500 min-w-[50px]">
                                                {Math.round(
                                                    budgetRange[1] / 1000
                                                )}
                                                k
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton Rechercher */}
                                <Button
                                    variant="secondary"
                                    size="default"
                                    className="transition-colors shadow-md shadow-[#1ea64a]"
                                >
                                    Rechercher
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Champs de recherche - Onglet Bâtiment */}
                        <TabsContent value="batiment" className="mt-0">
                            <div className="flex flex-col items-center mt-2 h-full p-6 md:flex-row gap-4 rounded-[12px] border border-[#1EA64A]">
                                {/* Champ Ville */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Ville
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedCity}
                                            onValueChange={setSelectedCity}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Grand-Bassam" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Grand-Bassam">
                                                    Grand-Bassam
                                                </SelectItem>
                                                <SelectItem value="Abidjan">
                                                    Abidjan
                                                </SelectItem>
                                                <SelectItem value="Yamoussoukro">
                                                    Yamoussoukro
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Type de Bâtiment */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Type de Bâtiment
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedBuildingType}
                                            onValueChange={
                                                setSelectedBuildingType
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Résidentiel" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Résidentiel">
                                                    Résidentiel
                                                </SelectItem>
                                                <SelectItem value="Commercial">
                                                    Commercial
                                                </SelectItem>
                                                <SelectItem value="Mixte">
                                                    Mixte
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Nombre de Chambres */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Chambres
                                    </label>
                                    <div className="relative">
                                        <Select
                                            value={selectedBedrooms}
                                            onValueChange={setSelectedBedrooms}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="2 chambres" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    1 chambre
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    2 chambres
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    3 chambres
                                                </SelectItem>
                                                <SelectItem value="4+">
                                                    4+ chambres
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Champ Surface */}
                                <div className="flex-1">
                                    <label className="block text-xl font-medium text-gray-700 mb-2">
                                        Surface (m²)
                                    </label>
                                    <div className="relative">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl text-gray-500 min-w-[50px]">
                                                {surfaceRange[0]}m²
                                            </span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                                                <div
                                                    className="absolute top-0 h-2 bg-[#1EA64A] rounded-full"
                                                    style={{
                                                        left: `${
                                                            ((surfaceRange[0] -
                                                                20) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`,
                                                        width: `${
                                                            ((surfaceRange[1] -
                                                                surfaceRange[0]) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`
                                                    }}
                                                ></div>
                                                <input
                                                    type="range"
                                                    min="20"
                                                    max="300"
                                                    step="5"
                                                    value={surfaceRange[0]}
                                                    onChange={(e) => {
                                                        const newMin = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMin <
                                                            surfaceRange[1]
                                                        ) {
                                                            setSurfaceRange([
                                                                newMin,
                                                                surfaceRange[1]
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />
                                                <input
                                                    type="range"
                                                    min="20"
                                                    max="300"
                                                    step="5"
                                                    value={surfaceRange[1]}
                                                    onChange={(e) => {
                                                        const newMax = parseInt(
                                                            e.target.value
                                                        );
                                                        if (
                                                            newMax >
                                                            surfaceRange[0]
                                                        ) {
                                                            setSurfaceRange([
                                                                surfaceRange[0],
                                                                newMax
                                                            ]);
                                                        }
                                                    }}
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                    style={{ zIndex: 2 }}
                                                />
                                            </div>
                                            <span className="text-xl text-gray-500 min-w-[50px]">
                                                {surfaceRange[1]}m²
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton Rechercher */}
                                <Button
                                    variant="secondary"
                                    size="default"
                                    className="transition-colors shadow-md shadow-[#1ea64a]"
                                >
                                    Rechercher
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Contenu principal avec carte et résultats */}
                <div
                    className={`grid grid-cols-1 ${
                        viewMode === 'grid' ? 'lg:grid-cols-2' : 'w-full'
                    }`}
                >
                    <div
                        className={`flex flex-col ${
                            viewMode === 'grid' ? 'gap-20 w-full' : 'w-full'
                        }`}
                    >
                        {/* Section des résultats */}
                        {/* En-tête des résultats avec options de vue */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col items-start justify-start gap-5 w-full">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Appartement à Abidjan
                                    </h2>
                                    <p className="text-gray-600">
                                        {filteredProperties.length} appartement
                                        {filteredProperties.length > 1
                                            ? 's'
                                            : ''}{' '}
                                        trouvé
                                        {filteredProperties.length > 1
                                            ? 's'
                                            : ''}
                                    </p>
                                </div>

                                {/* Boutons de filtres et vue */}
                                <div className="flex items-center w-full gap-24">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            Prix
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Appartement
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Plus
                                        </Button>
                                    </div>

                                    {/* Boutons de basculement vue */}
                                    <div className="flex border border-gray-300 rounded-lg">
                                        <Button
                                            variant={
                                                viewMode === 'grid'
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() => setViewMode('grid')}
                                            className="rounded-r-none"
                                        >
                                            <Grid className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={
                                                viewMode === 'list'
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() => setViewMode('list')}
                                            className="rounded-l-none"
                                        >
                                            <List className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end items-end mb-4 py-5">
                                <Input
                                    leftIcon={<SearchIcon />}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Rechercher dans les résultats..."
                                    className="w-80"
                                />
                            </div>
                        </div>

                        {/* Liste des propriétés */}
                        <div
                            className={`space-y-4 ${
                                viewMode === 'grid'
                                    ? 'h-auto'
                                    : 'h-[600px] overflow-y-auto'
                            }`}
                        >
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {currentProperties.map((property) => (
                                        <PropertyCardGrid
                                            key={property.id}
                                            id={property.id}
                                            title={property.title}
                                            location={property.location}
                                            price={property.price}
                                            rooms={`${
                                                property.bedrooms
                                            } Chambre${
                                                property.bedrooms > 1 ? 's' : ''
                                            }`}
                                            bathrooms={`${
                                                property.bathrooms
                                            } Douche${
                                                property.bathrooms > 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                            area={property.area}
                                            parking="N/A"
                                            image={property.image}
                                            className="hover:scale-105 transition-transform duration-300"
                                            // Propriétés supplémentaires pour les détails
                                            description={property.description}
                                            cover_url={property.image}
                                            reference={property.reference}
                                            street={property.street}
                                            address={property.address}
                                            latitude={property.coordinates.lat}
                                            longitude={property.coordinates.lng}
                                            rooms_count={property.bedrooms}
                                            likes_count={property.likes_count}
                                            views_count={property.views_count}
                                            area_m2={parseInt(
                                                property.area
                                                    .replace('m²', '')
                                                    .replace(' ', '')
                                            )}
                                            monthly_rent_amount={parseInt(
                                                property.price.replace(
                                                    /[^\d]/g,
                                                    ''
                                                )
                                            )}
                                            is_busy={property.is_busy}
                                            photos={property.photos}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {currentProperties.map((property) => (
                                        <PropertyCardGrid
                                            key={property.id}
                                            id={property.id}
                                            title={property.title}
                                            location={property.location}
                                            price={property.price}
                                            rooms={`${
                                                property.bedrooms
                                            } Chambre${
                                                property.bedrooms > 1 ? 's' : ''
                                            }`}
                                            bathrooms={`${
                                                property.bathrooms
                                            } Douche${
                                                property.bathrooms > 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                            area={property.area}
                                            parking="N/A"
                                            image={property.image}
                                            className="flex flex-row items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                            // Propriétés supplémentaires pour les détails
                                            description={property.description}
                                            cover_url={property.image}
                                            reference={property.reference}
                                            street={property.street}
                                            address={property.address}
                                            latitude={property.coordinates.lat}
                                            longitude={property.coordinates.lng}
                                            rooms_count={property.bedrooms}
                                            likes_count={property.likes_count}
                                            views_count={property.views_count}
                                            area_m2={parseInt(
                                                property.area
                                                    .replace('m²', '')
                                                    .replace(' ', '')
                                            )}
                                            monthly_rent_amount={parseInt(
                                                property.price.replace(
                                                    /[^\d]/g,
                                                    ''
                                                )
                                            )}
                                            is_busy={property.is_busy}
                                            photos={property.photos}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className={
                                viewMode === 'grid' ? 'w-full' : 'lg:w-1/2'
                            }
                        >
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div
                    className={`flex gap-8 ${
                        viewMode === 'grid'
                            ? 'flex-col w-full'
                            : 'flex-col lg:flex-row w-full lg:w-1/2'
                    }`}
                > */}
                    {/* Section de la carte */}
                </div>
                <div className={viewMode === 'grid' ? 'w-full' : ' w-full'}>
                    <div
                        ref={mapRef}
                        className="h-[600px] rounded-lg overflow-hidden"
                        style={{ minHeight: '600px' }}
                    />
                </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default SearchWithMap;
