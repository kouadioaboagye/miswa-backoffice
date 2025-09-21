import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PropertyCard } from '@/shared/components/ui/property-card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/shared/components/ui/select';
import { MapPinIcon, SearchIcon } from 'lucide-react';
import { OnMapIcon } from '../../../../../public/assets/icons/on-map-icon';

const PropertiesSection = () => {
    const properties = [
        {
            id: 1,
            title: 'Cité AGC, Grand Bassam',
            location: 'Abidjan, Marcory',
            rooms: '2 Chambre',
            bathrooms: '2 douche',
            area: '200m²',
            parking: '1 Parking Lot',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        },
        {
            id: 2,
            title: 'Appartement Marcory zone 4 Netle ci',
            location: 'Abidjan, Marcory',
            rooms: '2 Chambre',
            bathrooms: '2 douche',
            area: '200m²',
            parking: '1 Parking Lot',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        },
        {
            id: 3,
            title: 'Résidence moderne Cocody',
            location: 'Abidjan, Cocody',
            rooms: '3 Chambre',
            bathrooms: '2 douche',
            area: '250m²',
            parking: '2 Parking Lot',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        },
        {
            id: 4,
            title: 'Villa luxueuse Riviera',
            location: 'Abidjan, Riviera',
            rooms: '4 Chambre',
            bathrooms: '3 douche',
            area: '300m²',
            parking: '2 Parking Lot',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        },
        {
            id: 5,
            title: 'Studio moderne Plateau',
            location: 'Abidjan, Plateau',
            rooms: '1 Chambre',
            bathrooms: '1 douche',
            area: '80m²',
            parking: '1 Parking Lot',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        },
        {
            id: 6,
            title: 'Penthouse Cocody Angré',
            location: 'Abidjan, Cocody',
            rooms: '5 Chambre',
            bathrooms: '4 douche',
            area: '400m²',
            parking: '3 Parking Lot',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=604&h=550&fit=crop&crop=center'
        }
    ];

    return (
        <section className="bg-white py-16 sm:py-20 md:py-24">
            <div className="mx-auto flex max-w-[75%] flex-col gap-12">
                {/* Titre et sous-titre */}
                <div className="mb-12 flex flex-col  gap-2 text-start">
                    <h2 className="mb-4 text-4xl font-bold text-[#14385C] md:text-5xl lg:text-6xl">
                        Bâtiment proches de vous !
                    </h2>
                    <p className="text-lg text-[#6b7280] md:text-2xl">
                        Nous sélectionnons les meilleurs biens près de chez
                        vous.
                    </p>
                </div>

                {/* Barre de recherche */}
                <div className="mb-20 flex w-full items-center justify-between gap-8 sm:gap-6">
                    <div className="flex w-[60%] gap-10">
                        <div className='w-[30%]'>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Grand-Bassam" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grand-bassam">
                                        Grand-Bassam
                                    </SelectItem>
                                    <SelectItem value="abidjan">Abidjan</SelectItem>
                                    <SelectItem value="yamoussoukro">
                                        Yamoussoukro
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 w-[70%]">
                            <Input
                                placeholder="Rechercher..."
                                leftIcon={
                                    <SearchIcon className="size-10 text-[#1EA64A]" />
                                }
                            />
                        </div>

                    </div>

                    <Button
                        className="flex items-center gap-2 text-2xl bg-[#14385C] text-white hover:bg-[#1a4a6b]"
                        rightIcon={<OnMapIcon className="size-10 " />}
                        variant="default"
                        size="default"
                    >
                        Sur la map
                    </Button>
                </div>
            </div>

            {/* Container pour la superposition */}
            <div className="relative">
                {/* Cartes de propriétés - Scroll infini avec superposition */}
                <div className="relative z-10 -mb-36">
                    <div className="relative overflow-hidden">
                        <div className="animate-scroll-infinite flex gap-6">
                            {/* Premier set de cartes */}
                            {properties.map((property) => (
                                <PropertyCard
                                    key={`first-${property.id}`}
                                    {...property}
                                />
                            ))}

                            {/* Deuxième set de cartes pour l'effet infini */}
                            {properties.map((property) => (
                                <PropertyCard
                                    key={`second-${property.id}`}
                                    {...property}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter avec espace pour la superposition */}
                <div className="relative z-0 mx-auto flex flex-col items-center justify-center gap-6 bg-[#14385C] p-8 pt-20 text-white md:px-12 md:py-20">
                    {/* Bouton Voir les annonces */}
                    <div className="mb-8 text-center mt-48">
                        <Button
                            variant="secondary"
                            size="default"
                            className="px-8 py-3"
                        >
                            Voir les annonces
                        </Button>
                    </div>

                    {/* Layout en deux colonnes */}
                    <div className="flex max-w-[75%] flex-col items-center justify-between gap-8 lg:flex-row lg:items-center">
                        {/* Colonne gauche - Texte */}
                        <div className="flex max-w-[50%] flex-col gap-3 text-center lg:text-left">
                            <h3 className="mb-2 text-lg font-bold opacity-60 md:text-2xl">
                                Rejoignez-notre newsletter
                            </h3>
                            <h4 className="mb-4 text-2xl font-bold md:text-6xl">
                                Abonnez-vous à notre newsletter
                            </h4>
                            <p className="opacity-40 md:text-3xl">
                                Restez informé de l&apos;avancement de la
                                feuille de route, des annonces et des remises
                                exclusives, n&apos;hésitez pas à vous inscrire
                                avec votre e-mail
                            </p>
                        </div>

                        {/* Colonne droite - Formulaire */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Input
                                type="email"
                                placeholder="Entrer votre email"
                                className="w-full rounded-[12px] border border-gray-300 bg-white px-4 py-4 h-[5rem] text-gray-700 focus:border-[#1ea64a] focus:outline-none sm:w-80"
                            />
                            <Button
                                variant="secondary"
                                size="default"
                                className="px-8"
                            >
                                S&apos;inscrire
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertiesSection;
