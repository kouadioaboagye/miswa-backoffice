import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

// Données de fallback pour les options de chambres
const FALLBACK_ROOM_OPTIONS = [
    { id: 1, value: '1', label: '1 chambre' },
    { id: 2, value: '2', label: '2 chambres' },
    { id: 3, value: '3', label: '3 chambres' },
    { id: 4, value: '4', label: '4 chambres' },
    { id: 5, value: '5+', label: '5+ chambres' }
];

export async function GET(request: NextRequest) {
    try {
        const url = new URL(`${API_BASE_URL}/properties/room-options/`);

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
                data: FALLBACK_ROOM_OPTIONS,
                total: FALLBACK_ROOM_OPTIONS.length
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching room options, using fallback:', error);
        return NextResponse.json({
            data: FALLBACK_ROOM_OPTIONS,
            total: FALLBACK_ROOM_OPTIONS.length
        });
    }
}
