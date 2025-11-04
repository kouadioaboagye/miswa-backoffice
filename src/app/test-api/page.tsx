'use client';

import { useSearchData } from '@/shared/hooks/use-search-data';

export default function TestApiPage() {
    const {
        municipalities,
        propertyTypes,
        buildingTypes,
        priceRanges,
        surfaceRanges,
        roomOptions,
        isLoading,
        isError
    } = useSearchData();

    if (isLoading) {
        return <div className="p-8">Chargement des données...</div>;
    }

    if (isError) {
        return (
            <div className="p-8 text-red-500">
                Erreur lors du chargement des données
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold">Test des APIs</h1>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Municipalités ({municipalities.data?.length || 0})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {municipalities.data?.map((municipality: any) => (
                        <div
                            key={municipality.id}
                            className="p-2 bg-gray-100 rounded"
                        >
                            {municipality.name}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Types de propriétés ({propertyTypes.data?.length || 0})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.data?.map((type: any) => (
                        <div key={type.id} className="p-2 bg-gray-100 rounded">
                            {type.name}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Types de bâtiments ({buildingTypes.data?.length || 0})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {buildingTypes.data?.map((type: any) => (
                        <div key={type.id} className="p-2 bg-gray-100 rounded">
                            {type.name}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Plages de prix ({priceRanges.data?.length || 0})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {priceRanges.data?.map((range: any) => (
                        <div
                            key={range.label}
                            className="p-2 bg-gray-100 rounded"
                        >
                            {range.label}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Plages de surface ({surfaceRanges.data?.length || 0})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {surfaceRanges.data?.map((range: any) => (
                        <div
                            key={range.label}
                            className="p-2 bg-gray-100 rounded"
                        >
                            {range.label}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Options de chambres ({roomOptions.data?.length || 0})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {roomOptions.data?.map((option: any) => (
                        <div
                            key={option.id}
                            className="p-2 bg-gray-100 rounded"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
