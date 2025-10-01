'use client';

interface Amenities {
    parking: { available: boolean; count?: number };
    security: { available: boolean; type?: string };
    commonAreas: { available: boolean; details?: string };
    utilities: { available: boolean; status?: string };
    elevator: { available: boolean };
}

interface PropertyAmenitiesProps {
    amenities: Amenities;
}

const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
    const amenitiesList = [
        {
            id: 'parking',
            title: 'Parking',
            subtitle: amenities.parking.count?.toString(),
            available: amenities.parking.available
        },
        {
            id: 'security',
            title: 'Sécurité',
            subtitle: amenities.security.type,
            available: amenities.security.available
        },
        {
            id: 'commonAreas',
            title: 'Espaces Communs',
            subtitle: amenities.commonAreas.details,
            available: amenities.commonAreas.available
        },
        {
            id: 'utilities',
            title: 'Système Eau/Électricité',
            subtitle: amenities.utilities.status,
            available: amenities.utilities.available
        },
        {
            id: 'elevator',
            title: 'Ascenseur',
            subtitle: '',
            available: amenities.elevator.available
        }
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Commodités</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {amenitiesList.map((amenity) => (
                    <div
                        key={amenity.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-[1px] ${
                            amenity.available
                                ? 'bg-[#F8FAFC] border-[#16527d33]'
                                : 'bg-gray-50 border-gray-200'
                        }`}
                    >
                        <div className="flex-1 min-w-0">
                            <p
                                className={`text-sm font-medium ${
                                    amenity.available
                                        ? 'text-gray-900'
                                        : 'text-gray-500'
                                }`}
                            >
                                {amenity.title}
                            </p>
                            {amenity.subtitle && (
                                <p
                                    className={`text-md ${
                                        amenity.available
                                            ? 'text-gray-600'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {amenity.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyAmenities;
