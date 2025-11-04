import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

// Données de fallback pour les types de bâtiments
const FALLBACK_BUILDING_TYPES = [
    { id: 1, name: 'Résidentiel', code: 'RES' },
    { id: 2, name: 'Commercial', code: 'COM' },
    { id: 3, name: 'Mixte', code: 'MIX' },
    { id: 4, name: 'Industriel', code: 'IND' }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const skip = searchParams.get('skip') || '0';
        const limit = searchParams.get('limit') || '100';

        const url = new URL(`${API_BASE_URL}/building-types/`);
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
                data: FALLBACK_BUILDING_TYPES,
                total: FALLBACK_BUILDING_TYPES.length
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching building types, using fallback:', error);
        return NextResponse.json({
            data: FALLBACK_BUILDING_TYPES,
            total: FALLBACK_BUILDING_TYPES.length
        });
    }
}
