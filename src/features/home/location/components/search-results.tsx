'use client';

import { SearchIcon } from '@/shared/components/atoms/icons/search-icon';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PropertyCard } from '@/shared/components/ui/property-card';
import Pagination from '@/shared/components/ui/pagination';
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
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Property {
    id: number;
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
}

interface ApiResponse {
    data: Property[];
    total: number;
}

const SearchResults = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

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

    // Fonction pour formater les propriétés pour PropertyCard
    const formatPropertyForCard = (property: Property) => {
        return {
            id: property.id,
            title: property.name,
            location: property.address || property.street,
            rooms: `${property.rooms_count} Chambre${property.rooms_count > 1 ? 's' : ''}`,
            bathrooms: 'Aucun', // L'API ne semble pas fournir cette information
            area: `${property.area_m2}m²`,
            parking: 'Aucun', // L'API ne semble pas fournir cette information
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center',
            price: property.monthly_rent_amount ? `${property.monthly_rent_amount.toLocaleString()} FCFA/mois` : 'Prix non disponible'
        };
    };

    const fetchProperties = async () => {
        try {
            setLoading(true);
              const response = await fetch('/api/properties', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data: ApiResponse = await response.json();
            setProperties(data.data);
            setFilteredProperties(data.data); // Initialiser les propriétés filtrées
        } catch (err) {
            console.error('Erreur lors du chargement des propriétés:', err);
            setError('Impossible de charger les propriétés');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Filtrer les propriétés selon le terme de recherche
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProperties(properties);
        } else {
            const filtered = properties.filter(
                (property) =>
                    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    property.street.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProperties(filtered);
        }
        setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
    }, [searchTerm, properties]);

    // Calculer la pagination
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <section className="flex justify-center py-20 w-full bg-white sm:max-w-[95%] md:max-w-[90%]">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">Chargement des propriétés...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex justify-center py-20 w-full bg-white sm:max-w-[95%] md:max-w-[90%]">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-red-500 py-16">{error}</div>
                    <Button onClick={fetchProperties} className="mx-auto">
                        Réessayer
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="flex justify-center py-20 w-full bg-white sm:max-w-[95%] md:max-w-[90%]">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Header avec barre de recherche */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-20">
                    <div>
                        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">
                            Rechercher des propriétés à louer
                        </h1>
                        <p className="text-gray-600">
                            {filteredProperties.length} propriété
                            {filteredProperties.length > 1 ? 's' : ''} trouvée
                            {filteredProperties.length > 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="w-full lg:w-80 mt-4 lg:mt-0">
                        <Input
                            leftIcon={<SearchIcon />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher par nom, adresse..."
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Barre de recherche avec onglets */}
                <div className="relative z-10 bg-white pr-12 rounded-[25px] pt-12 w-full mx-auto mb-8">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        {/* Onglets */}
                        <div className="w-[400px] text-white flex gap-1 mb-6 absolute -top-12 px-8 rounded-full bg-[#0E4D79] py-6 left-0">
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
                                                    Villa
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
                                                {/* Piste de sélection */}
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

                                                {/* Poignée gauche */}
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

                                                {/* Poignée droite */}
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

                                                {/* Poignées visuelles */}
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((budgetRange[0] -
                                                                50000) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((budgetRange[1] -
                                                                50000) /
                                                                (500000 -
                                                                    50000)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
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
                                                {/* Piste de sélection */}
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

                                                {/* Poignée gauche */}
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

                                                {/* Poignée droite */}
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

                                                {/* Poignées visuelles */}
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((surfaceRange[0] -
                                                                20) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                    style={{
                                                        left: `${
                                                            ((surfaceRange[1] -
                                                                20) /
                                                                (300 - 20)) *
                                                            100
                                                        }%`,
                                                        top: '50%',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        zIndex: 3
                                                    }}
                                                ></div>
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

                {/* Grille de propriétés */}
                <div className="flex flex-col items-center w-full pt-12">
                    {/* Affichage des propriétés */}
                    {filteredProperties.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-xl">
                                Aucune propriété ne correspond à votre recherche.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 w-full">
                                {currentProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        {...formatPropertyForCard(property)}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SearchResults;