// app/api/property-features/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api.miswa.ci/api/v1';

export async function GET(request: NextRequest) {
     const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace(/^bearer/i, '').trim() || null;

    
    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification manquant' },
        { status: 401 }
      );
    }

  try {
    const response = await fetch(`${API_BASE_URL}/property-features/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching property features:', error);
    return NextResponse.json(
      { 
        error: 'Impossible de charger les caractéristiques',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}