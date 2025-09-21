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

const   SectionColor = () => {
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
            

            {/* Container pour la superposition */}
            <div className="relative">
                


                {/* Newsletter avec espace pour la superposition */}
                <div className="relative z-0 mx-auto flex flex-col items-center justify-center gap-6 bg-[#14385C] p-8 pt-20 text-white md:px-12 md:py-56">
                    

                    {/* Layout en deux colonnes */}
                    <div className="flex max-w-[75%] flex-col items-center justify-between gap-8 lg:flex-row lg:items-center">
                        {/* Colonne gauche - Texte */}
                        <div className="flex max-w-[50%] flex-col gap-6 text-center lg:text-left">
                            <h3 className="mb-2 text-lg font-bold opacity-60 md:text-2xl">
                                Rejoignez-notre newsletter
                            </h3>
                            <h4 className="mb-4 text-3xl font-bold md:text-7xl">
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

export default SectionColor;
