import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

// Données de fallback pour les plages de surface
const FALLBACK_SURFACE_RANGES = [
    { min: 20, max: 50, label: '20-50m²', count: 0 },
    { min: 50, max: 100, label: '50-100m²', count: 0 },
    { min: 100, max: 150, label: '100-150m²', count: 0 },
    { min: 150, max: 200, label: '150-200m²', count: 0 },
    { min: 200, max: null, label: '200m²+', count: 0 }
];

export async function GET(request: NextRequest) {
    try {
        const url = new URL(`${API_BASE_URL}/properties/surface-ranges/`);

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
                data: FALLBACK_SURFACE_RANGES,
                total: FALLBACK_SURFACE_RANGES.length
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching surface ranges, using fallback:', error);
        return NextResponse.json({
            data: FALLBACK_SURFACE_RANGES,
            total: FALLBACK_SURFACE_RANGES.length
        });
    }
}
