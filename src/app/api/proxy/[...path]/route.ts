import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.miswa.ci/api/v1';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const url = new URL(request.url);
        const queryString = url.search;
        
        // Nettoyer le chemin pour éviter les doubles slashes
        const cleanPath = path.filter(p => p).join('/');
        
        // Construire l'URL complète de l'API (sans double slash)
        const apiUrl = `${API_BASE_URL.replace(/\/$/, '')}/${cleanPath}${queryString}`;
        
        console.log('🔄 Proxy GET request to:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Transférer les headers nécessaires
                ...(request.headers.get('authorization') && {
                    'Authorization': request.headers.get('authorization')!
                }),
            },
        });

        // Vérifier le content-type de la réponse
        const contentType = response.headers.get('content-type');
        
        // Si la réponse n'est pas JSON, lire le texte
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ API returned non-JSON response:', text);
            
            return NextResponse.json(
                { 
                    error: 'Erreur du serveur',
                    message: text || 'Le serveur a retourné une réponse invalide',
                    status: response.status
                },
                { 
                    status: response.status >= 200 && response.status < 300 ? 500 : response.status,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    },
                }
            );
        }

        const data = await response.json();
        
        console.log('✅ Proxy GET success:', response.status);

        // Retourner la réponse avec les headers CORS appropriés
        return NextResponse.json(data, {
            status: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error: any) {
        console.error('❌ Proxy error:', error.message);
        return NextResponse.json(
            { 
                error: 'Erreur lors de la requête API',
                message: error.message || 'Une erreur inattendue est survenue',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const body = await request.json();
        
        // Nettoyer le chemin
        const cleanPath = path.filter(p => p).join('/');
        const apiUrl = `${API_BASE_URL.replace(/\/$/, '')}/${cleanPath}`;
        
        console.log('🔄 Proxy POST request to:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(request.headers.get('authorization') && {
                    'Authorization': request.headers.get('authorization')!
                }),
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ API returned non-JSON response:', text);
            
            return NextResponse.json(
                { 
                    error: 'Erreur du serveur',
                    message: text || 'Le serveur a retourné une réponse invalide',
                    status: response.status
                },
                { 
                    status: response.status >= 200 && response.status < 300 ? 500 : response.status,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }

        const data = await response.json();
        console.log('✅ Proxy POST success:', response.status);

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error: any) {
        console.error('❌ Proxy error:', error.message);
        return NextResponse.json(
            { 
                error: 'Erreur lors de la requête API',
                message: error.message || 'Une erreur inattendue est survenue'
            },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const body = await request.json();
        
        const cleanPath = path.filter(p => p).join('/');
        const apiUrl = `${API_BASE_URL.replace(/\/$/, '')}/${cleanPath}`;
        
        console.log('🔄 Proxy PUT request to:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(request.headers.get('authorization') && {
                    'Authorization': request.headers.get('authorization')!
                }),
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ API returned non-JSON response:', text);
            
            return NextResponse.json(
                { 
                    error: 'Erreur du serveur',
                    message: text || 'Le serveur a retourné une réponse invalide',
                    status: response.status
                },
                { 
                    status: response.status >= 200 && response.status < 300 ? 500 : response.status,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }

        const data = await response.json();
        console.log('✅ Proxy PUT success:', response.status);

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error: any) {
        console.error('❌ Proxy error:', error.message);
        return NextResponse.json(
            { error: 'Erreur lors de la requête API', message: error.message },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        
        const cleanPath = path.filter(p => p).join('/');
        const apiUrl = `${API_BASE_URL.replace(/\/$/, '')}/${cleanPath}`;
        
        console.log('🔄 Proxy DELETE request to:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(request.headers.get('authorization') && {
                    'Authorization': request.headers.get('authorization')!
                }),
            },
        });

        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ API returned non-JSON response:', text);
            
            return NextResponse.json(
                { 
                    error: 'Erreur du serveur',
                    message: text || 'Le serveur a retourné une réponse invalide',
                    status: response.status
                },
                { 
                    status: response.status >= 200 && response.status < 300 ? 500 : response.status,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
        }

        const data = await response.json();
        console.log('✅ Proxy DELETE success:', response.status);

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error: any) {
        console.error('❌ Proxy error:', error.message);
        return NextResponse.json(
            { error: 'Erreur lors de la requête API', message: error.message },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    }
}

// Gérer les requêtes OPTIONS (preflight CORS)
export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        }
    );
}

