import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.miswa.ci/api/v1';

export async function GET(request: NextRequest) {
    try {
        // Récupérer les paramètres de requête
        const { searchParams } = new URL(request.url);

        // Construire les paramètres de filtrage
        const filters: Record<string, string> = {};

        // Paramètres de pagination
        const skip = searchParams.get('skip') || '0';
        const limit = searchParams.get('limit') || '100';

        // Paramètres de prix
        const minPrice = searchParams.get('min_price');
        const maxPrice = searchParams.get('max_price');
        const priceRange = searchParams.get('price_range');

        // Paramètres de caractéristiques
        const roomsCount = searchParams.get('rooms_count');
        const minArea = searchParams.get('min_area');
        const maxArea = searchParams.get('max_area');

        // Paramètres géographiques
        const municipalityId = searchParams.get('municipality_id');
        const buildingId = searchParams.get('building_id');

        // Recherche textuelle
        const search = searchParams.get('search');

        // Ajouter les paramètres non vides
        if (minPrice) filters.min_price = minPrice;
        if (maxPrice) filters.max_price = maxPrice;
        if (priceRange) filters.price_range = priceRange;
        if (roomsCount) filters.rooms_count = roomsCount;
        if (minArea) filters.min_area = minArea;
        if (maxArea) filters.max_area = maxArea;
        if (municipalityId) filters.municipality_id = municipalityId;
        if (buildingId) filters.building_id = buildingId;
        if (search) filters.search = search;

        // Construire l'URL avec les paramètres
        const url = new URL(`${API_BASE_URL}/properties/public`);
        url.searchParams.set('skip', skip);
        url.searchParams.set('limit', limit);

        // Ajouter les filtres
        Object.entries(filters).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store' // Pour toujours avoir des données fraîches
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json(
            {
                error: 'Impossible de charger les propriétés',
                message:
                    error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Récupérer le token d'authentification
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace(/^bearer/i, '').trim() || null;

        if (!token) {
            return NextResponse.json(
                { error: "Token d'authentification manquant" },
                { status: 401 }
            );
        }

        // Récupérer les données du body
        const body = await request.json();

        // Appel à l'API externe avec le token
        const response = await fetch(`${API_BASE_URL}/properties/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        // Log pour le débogage
        console.log('API Response Status:', response.status);
        console.log(' Reponse Status:', response.body);

        // Gérer les erreurs HTTP
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: response.statusText
            }));

            console.error('Erreur API externe:', {
                status: response.status,
                statusText: response.statusText,
                errorData
            });

            return NextResponse.json(
                {
                    error: 'Erreur lors de la création de la propriété',
                    details: errorData,
                    status: response.status
                },
                { status: response.status }
            );
        }

        // Récupérer et retourner les données
        const data = await response.json();
        console.log('Propriété créée avec succès:', data);

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de la propriété:', error);

        // Différencier les types d'erreurs
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                {
                    error: 'Format de données invalide',
                    message: 'Le corps de la requête doit être un JSON valide'
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: 'Erreur serveur',
                message:
                    error instanceof Error ? error.message : 'Erreur inconnue'
            },
            { status: 500 }
        );
    }
}
