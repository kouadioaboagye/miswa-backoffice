import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

// Données de fallback pour les plages de prix
const FALLBACK_PRICE_RANGES = [
    { min: 0, max: 100000, label: '0-100k FCFA', count: 0 },
    { min: 100000, max: 250000, label: '100k-250k FCFA', count: 0 },
    { min: 250000, max: 500000, label: '250k-500k FCFA', count: 0 },
    { min: 500000, max: 1000000, label: '500k-1M FCFA', count: 0 },
    { min: 1000000, max: null, label: '1M+ FCFA', count: 0 }
];

export async function GET(request: NextRequest) {
    try {
        const url = new URL(`${API_BASE_URL}/properties/price-ranges/`);

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
                data: FALLBACK_PRICE_RANGES,
                total: FALLBACK_PRICE_RANGES.length
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching price ranges, using fallback:', error);
        return NextResponse.json({
            data: FALLBACK_PRICE_RANGES,
            total: FALLBACK_PRICE_RANGES.length
        });
    }
}
