import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.miswa.ci/api/v1';

// Données de fallback pour les types de propriétés
const FALLBACK_PROPERTY_TYPES = [
    { id: 1, name: 'Appartement', code: 'APT' },
    { id: 2, name: 'Maison', code: 'HOUSE' },
    { id: 3, name: 'Studio', code: 'STUDIO' },
    { id: 4, name: 'Villa', code: 'VILLA' },
    { id: 5, name: 'Duplex', code: 'DUPLEX' }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const skip = searchParams.get('skip') || '0';
        const limit = searchParams.get('limit') || '100';

        const url = new URL(`${API_BASE_URL}/property-types/`);
        url.searchParams.set('skip', skip);
        url.searchParams.set('limit', limit);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.warn('API endpoint not available, using fallback data');
            return NextResponse.json({
                data: FALLBACK_PROPERTY_TYPES,
                total: FALLBACK_PROPERTY_TYPES.length
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching property types, using fallback:', error);
        return NextResponse.json({
            data: FALLBACK_PROPERTY_TYPES,
            total: FALLBACK_PROPERTY_TYPES.length
        });
    }
}
