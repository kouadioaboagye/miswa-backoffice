'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Calendar, Home, User } from 'lucide-react';
import { useState } from 'react';

interface PropertySidebarProps {
    price: number;
    currency: string;
}

const PropertySidebar = ({ price, currency }: PropertySidebarProps) => {
    const [visitType, setVisitType] = useState('');
    const [visitDate, setVisitDate] = useState('');

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR').format(price) + ` ${currency}`;
    };

    const handleBooking = () => {
        // Logique de réservation
        console.log('Réservation de la propriété');
    };

    const handleVisitRequest = () => {
        // Logique de demande de visite
        console.log('Demande de visite:', { visitType, visitDate });
    };

    return (
        <div className="space-y-6 border border-gray-200 rounded-2xl p-6">
            {/* Prix et réservation */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Loyer mensuel
                    </h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {formatPrice(price, currency)} / Mois
                    </p>
                </div>

                <Button
                    onClick={handleBooking}
                    className="w-full bg-[#1EA64A] hover:bg-[#1a8a3f] text-white py-3 text-lg font-medium"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Occuper le bien
                </Button>
            </div>

            {/* Demande de visite */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                    Demande de visite
                </h3>

                <div className="space-y-4">
                    <div>
                        <Input
                            leftIcon={<User className="w-5 h-5" />}
                            value={visitType}
                            onChange={(e) => setVisitType(e.target.value)}
                            placeholder="En personne"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Input
                            leftIcon={<Calendar className="w-5 h-5" />}
                            type="date"
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                            placeholder="Date de visite"
                            className="w-full"
                        />
                    </div>

                    <Button
                        onClick={handleVisitRequest}
                        className="w-full bg-[#1A365D] hover:bg-[#12233f] text-white py-3 text-lg font-medium"
                    >
                        Prendre RDV pour la visite
                    </Button>
                </div>
            </div>

            {/* Aperçu intérieur */}
            {/* <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                    Aperçu intérieur
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop&crop=center"
                            alt="Salle de bain"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center"
                            alt="Salon"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default PropertySidebar;
