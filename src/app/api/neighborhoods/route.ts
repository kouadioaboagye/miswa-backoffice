import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

// Données de fallback pour les quartiers
const FALLBACK_NEIGHBORHOODS = [
    // Grand-Bassam
    { id: 1, name: 'Centre-ville', municipality_id: 1 },
    { id: 2, name: 'Quartier France', municipality_id: 1 },
    { id: 3, name: 'Boulevard de la République', municipality_id: 1 },

    // Abidjan
    { id: 4, name: 'Cocody', municipality_id: 2 },
    { id: 5, name: 'Plateau', municipality_id: 2 },
    { id: 6, name: 'Marcory', municipality_id: 2 },
    { id: 7, name: 'Riviera', municipality_id: 2 },
    { id: 8, name: 'Angré', municipality_id: 2 },
    { id: 9, name: 'Yopougon', municipality_id: 2 },
    { id: 10, name: 'Adjamé', municipality_id: 2 },
    { id: 11, name: 'Abobo', municipality_id: 2 },
    { id: 12, name: 'Koumassi', municipality_id: 2 },
    { id: 13, name: 'Port-Bouët', municipality_id: 2 },
    { id: 14, name: 'Treichville', municipality_id: 2 },
    { id: 15, name: 'Attécoubé', municipality_id: 2 },

    // Yamoussoukro
    { id: 16, name: 'Centre-ville', municipality_id: 3 },
    { id: 17, name: "Kouassi N'dawa", municipality_id: 3 },
    { id: 18, name: "Kouassi N'dawa Extension", municipality_id: 3 }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const municipalityId = searchParams.get('municipality_id');
        const skip = searchParams.get('skip') || '0';
        const limit = searchParams.get('limit') || '100';

        const url = new URL(`${API_BASE_URL}/neighborhoods/`);
        url.searchParams.set('skip', skip);
        url.searchParams.set('limit', limit);

        if (municipalityId) {
            url.searchParams.set('municipality_id', municipalityId);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.warn('API endpoint not available, using fallback data');

            // Filtrer par municipalité si spécifiée
            let filteredNeighborhoods = FALLBACK_NEIGHBORHOODS;
            if (municipalityId) {
                filteredNeighborhoods = FALLBACK_NEIGHBORHOODS.filter(
                    (n) => n.municipality_id === parseInt(municipalityId)
                );
            }

            return NextResponse.json({
                data: filteredNeighborhoods,
                total: filteredNeighborhoods.length
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching neighborhoods, using fallback:', error);

        // Filtrer par municipalité si spécifiée
        const municipalityId = new URL(request.url).searchParams.get(
            'municipality_id'
        );
        let filteredNeighborhoods = FALLBACK_NEIGHBORHOODS;
        if (municipalityId) {
            filteredNeighborhoods = FALLBACK_NEIGHBORHOODS.filter(
                (n) => n.municipality_id === parseInt(municipalityId)
            );
        }

        return NextResponse.json({
            data: filteredNeighborhoods,
            total: filteredNeighborhoods.length
        });
    }
}
