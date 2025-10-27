import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const skip = searchParams.get('skip') || '0';
        const limit = searchParams.get('limit') || '100';

        const url = new URL(`${API_BASE_URL}/municipalities/`);
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching municipalities:', error);
        return NextResponse.json(
            {
                error: 'Impossible de charger les municipalités',
                message:
                    error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
