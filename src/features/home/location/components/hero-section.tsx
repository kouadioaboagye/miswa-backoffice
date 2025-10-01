'use client';

import { Navbar } from '@/shared/components/layouts';
import { Button } from '@/shared/components/ui/button';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HeroSection = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('budget');
    const [budgetRange, setBudgetRange] = useState([100000, 400000]); // Valeurs en FCFA
    const [surfaceRange, setSurfaceRange] = useState([50, 200]); // Valeurs en m²
    const [selectedCity, setSelectedCity] = useState('Grand-Bassam');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('Cocody');
    const [selectedType, setSelectedType] = useState('Appartement');
    const [selectedBuildingType, setSelectedBuildingType] =
        useState('Résidentiel');
    const [selectedBedrooms, setSelectedBedrooms] = useState('2');

    const handleSearch = () => {
        const params = new URLSearchParams();

        // Paramètres communs
        params.set('city', selectedCity);
        params.set('budgetMin', budgetRange[0].toString());
        params.set('budgetMax', budgetRange[1].toString());

        if (activeTab === 'budget') {
            // Onglet Budget
            if (selectedNeighborhood)
                params.set('neighborhood', selectedNeighborhood);
            if (selectedType) params.set('propertyType', selectedType);
        } else {
            // Onglet Bâtiment
            if (selectedBuildingType)
                params.set('buildingType', selectedBuildingType);
            if (selectedBedrooms) params.set('bedrooms', selectedBedrooms);
            params.set('surfaceMin', surfaceRange[0].toString());
            params.set('surfaceMax', surfaceRange[1].toString());
        }

        router.push(`/recherche?${params.toString()}`);
    };

    return (
        <div className="relative flex h-[550px] w-full flex-col justify-between bg-[url('/assets/images/louer.svg')] bg-cover mb-16 pt-10 sm:px-4 md:px-8">
            {/* Overlay avec dégradé blanc horizontal */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-white/80 to-transparent"></div>
            <div className="relative w-full flex justify-center">
                <Navbar activeLink="louer" />
            </div>

            <div className="w-full flex justify-center mt-28">
                <div className="flex flex-col justify-between gap-24 h-[110%] w-[92%] px-0">
                    {/* Titre principal */}
                    <div className="relative z-10 flex flex-col gap-10 w-full">
                        <h1 className="text-[48px] font-normal leading-[50px] tracking-[-0.02em] text-[#14385C] font-['Montserrat']">
                            Retrouvez <br /> la maison de vos rêves <br /> sur{' '}
                            <span className="font-bold text-[48px] leading-[48px] tracking-[-0.02em] text-[#1EA64A]">
                                Miswa
                            </span>
                        </h1>
                        <p className="text-[18px] font-normal leading-[22px] tracking-[-0.02em] text-[#757575] font-['Open_Sans'] max-w-[438px]">
                            Accédez à des biens vérifiés et sécurisés. Louez en
                            toute confiance grâce à notre expertise et une
                            gestion centralisée.
                        </p>
                    </div>

                    {/* Barre de recherche avec onglets */}
                    <div className="relative z-10 bg-white pr-12 rounded-[25px] pt-12 w-fullmx-auto  w-[62%]">
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
                                                            const newMin =
                                                                parseInt(
                                                                    e.target
                                                                        .value
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
                                                        style={{
                                                            zIndex: 2
                                                        }}
                                                    />

                                                    {/* Poignée droite */}
                                                    <input
                                                        type="range"
                                                        min="50000"
                                                        max="500000"
                                                        step="10000"
                                                        value={budgetRange[1]}
                                                        onChange={(e) => {
                                                            const newMax =
                                                                parseInt(
                                                                    e.target
                                                                        .value
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
                                                        style={{
                                                            zIndex: 2
                                                        }}
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
                                        onClick={handleSearch}
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
                                                onValueChange={
                                                    setSelectedBedrooms
                                                }
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
                                                                    (300 -
                                                                        20)) *
                                                                100
                                                            }%`,
                                                            width: `${
                                                                ((surfaceRange[1] -
                                                                    surfaceRange[0]) /
                                                                    (300 -
                                                                        20)) *
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
                                                            const newMin =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                );
                                                            if (
                                                                newMin <
                                                                surfaceRange[1]
                                                            ) {
                                                                setSurfaceRange(
                                                                    [
                                                                        newMin,
                                                                        surfaceRange[1]
                                                                    ]
                                                                );
                                                            }
                                                        }}
                                                        className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                        style={{
                                                            zIndex: 2
                                                        }}
                                                    />

                                                    {/* Poignée droite */}
                                                    <input
                                                        type="range"
                                                        min="20"
                                                        max="300"
                                                        step="5"
                                                        value={surfaceRange[1]}
                                                        onChange={(e) => {
                                                            const newMax =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                );
                                                            if (
                                                                newMax >
                                                                surfaceRange[0]
                                                            ) {
                                                                setSurfaceRange(
                                                                    [
                                                                        surfaceRange[0],
                                                                        newMax
                                                                    ]
                                                                );
                                                            }
                                                        }}
                                                        className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                                                        style={{
                                                            zIndex: 2
                                                        }}
                                                    />

                                                    {/* Poignées visuelles */}
                                                    <div
                                                        className="absolute w-4 h-4 bg-[#1EA64A] rounded-full border-2 border-white shadow-md cursor-pointer"
                                                        style={{
                                                            left: `${
                                                                ((surfaceRange[0] -
                                                                    20) /
                                                                    (300 -
                                                                        20)) *
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
                                                                    (300 -
                                                                        20)) *
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
                                        onClick={handleSearch}
                                    >
                                        Rechercher
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
